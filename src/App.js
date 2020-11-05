import React, { useState, useEffect } from 'react';

// SERVICE
import { fetchPrograms, useSearchParams } from './services';

// CONSTANTS
import { LAND_SUCCESS, LAUNCH_SUCCESS, YEAR } from './constants';

// CSS
import './App.css';

// COMPONENTS
import Filter from './components/filters/Filter';
import CardView from './components/CardView';

export const getQueryData = location => {
  return ({
    [LAND_SUCCESS]: location.get(LAND_SUCCESS),
    [LAUNCH_SUCCESS]: location.get(LAUNCH_SUCCESS),
    [YEAR]: location.get(YEAR)
  })
}

function App({ data, requestParams = {} }) {

  let currentPageURL;
  let location = useSearchParams();

  let requestData = {};

  // If server side request
  if (!requestParams.isServer) {

    requestData = { ...requestParams, ...window.__PRELOADED_STATE__ }

    // update current url from window object
    currentPageURL = window.location.href;

  }

  // Programs list state
  const [programs, setPrograms] = useState(requestData.data || data || []);

  // Loading state
  const [isLoading, setLoading] = useState(false);

  // Error states
  const [error, setError] = useState(null);

  // Request query parameters
  const [queryParams, setQueryParams] = useState(getQueryData(location));


  // Get query data
  useEffect(() => {
    setLoading(true);
    setQueryParams(getQueryData(location))
  }, [currentPageURL]);


  // Set Programs in local states
  useEffect(() => {
    fetchPrograms({ setPrograms, setLoading, setError, ...queryParams });
  }, [queryParams]);


  // If any unhandled error show fallback
  if (error) {
    return (<div>Something went wrong</div>);
  }


  const renderLaunchCards = (programs) => {
    return (<CardView data={programs} key={programs.flight_number} />);
  }

  const renderFallback = () => {
    return (<p className="fallback-container text-center">No Mission found</p>);
  }

  const renderLoader = () => {
    return (<p className="fallback-container text-center">Loading Missions 🚀</p>);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>SpaceX Launch Programs</h3>
      </header>
      <main>
        <Filter />
        <section className="card-container">
          {
            isLoading ?
              renderLoader()
            :
            (
                programs.length ? programs.map(programs => {

                  return renderLaunchCards(programs);

                  }
                )
              :
                renderFallback()
            )
          }
        </section>
      </main>
      <h1 className="text-center">Developed By: Brijesh Singh</h1>
    </div>
  );
}

export default App;
