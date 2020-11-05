import express from "express";
import fs from "fs";
import url from "url";
import path from "path";
import es6Promise from "es6-promise";
import fetch from "isomorphic-fetch";
import compression from "compression";

import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router";

import App from "../src/App";
import { urlConstructor } from "../src/services";
import { LAUNCH_SUCCESS, LAND_SUCCESS, YEAR } from "../src/constants";


// Occupy port
const PORT = 3000;

// Create express instance
const app = express();
app.use(express.json());
app.use(compression({ level: 9 }));

// Load polyfill
es6Promise.polyfill();

const jsonMap = new Map();

app.use("^/$", (req, res, next) => {

  const urlObj = new URL(
    decodeURIComponent(url.format({
      protocol: req.protocol,
      host: req.get('host'),
      pathname: req.originalUrl
    }))
  );

  const reqObj = {
    isLaunchSuccess: urlObj.searchParams.get(LAUNCH_SUCCESS),
    isLandSuccess: urlObj.searchParams.get(LAND_SUCCESS),
    year: urlObj.searchParams.get(YEAR),
    isServer: true
  };

  const context = {};

  const endpoint = urlConstructor(reqObj);

  const sendDocResponse = jsonResponse => {

    fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {

      // In case of Error return
      if (err) {
        console.log(err);
        return res.status(500).send("Internal Error");
      }

      jsonMap.set(endpoint, { data: jsonResponse, time: new Date() });

      // Return UI
      return res.send(
        data.replace(
          '<div id="root"></div>',
          `<div id="root">${ReactDOMServer.renderToString(
            <StaticRouter location={req.url} context={context}>
              <App data={jsonResponse} reqObj={reqObj} />
            </StaticRouter>
          )}</div><script>window.__PRELOADED_STATE__ = ${JSON.stringify({ ...reqObj, isServer: false, data: jsonResponse })}</script>`
        )
      );

    });

  };

  if ( jsonMap.has(endpoint) && (new Date().getHours() - new Date(jsonMap.get(endpoint).time).getHours() < 2)) {
    sendDocResponse(jsonMap.get(endpoint).data);
  } else {
    fetch(endpoint).then(data => data.json()).then(sendDocResponse);
  }

});

// Use build folder for deployment
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Occupy and execute on port
app.listen(process.env.PORT || 3000, () => {
  console.log(`App launched on ${PORT}`);
});
