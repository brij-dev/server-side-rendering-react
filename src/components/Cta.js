import React from 'react';
import { useHistory } from "react-router-dom";

// SERVICE
import { useSearchParams } from "../services";

// CONSTANTS
import {
  LAND_SUCCESS,
  LAUNCH_SUCCESS,
  YEAR
} from "../constants";

// CSS
import "./Cta.css";

export default function Cta({ data, filterType }) {
  const history = useHistory();
  const location = useSearchParams();

  const navigateToPath = () => {
    const urlObj = new URL(window.location.href)


    if (filterType === LAUNCH_SUCCESS && data !== location.get(LAUNCH_SUCCESS)) {

      // Update launch success status
      urlObj.searchParams.set(LAUNCH_SUCCESS, data);

      // If rocket not launched it will not land also :)
      if(data === false){
        urlObj.searchParams.set(LAND_SUCCESS, false);
      }

    } else if ( filterType === LAND_SUCCESS && data !== location.get(LAND_SUCCESS)) {

      // Update land success status
      urlObj.searchParams.set(LAND_SUCCESS, data);

    } else if ( filterType === YEAR && data !== location.get(YEAR)) {

      // Update year filter
      urlObj.searchParams.set(YEAR, data);

    }

    history.push(`/${urlObj.search}`)
  }


  return (
    <div
      className={`filter-cta ${location.get(filterType) === data ? "active" : ""}`}
      onClick={navigateToPath}
    >
      {data}
    </div>
  )
}
