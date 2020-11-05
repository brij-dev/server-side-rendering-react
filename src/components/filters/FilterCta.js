import React from 'react';

// CONSTANTS
import {
  LAND_SUCCESS,
  LAUNCH_SUCCESS,
  SUCCESSFUL_LANDING
} from '../../constants';

// CSS
import "./FilterCta.css";

// COMPONENTS
import Cta from "../Cta";

export default function FilterCta({ type }) {
  return (
    <div className="launch-year-filter">
      <h3>{type}</h3>
      <hr />

      <div className="boolean-container">
        <Cta
          data={"true"}
          filterType={
            type === SUCCESSFUL_LANDING ? LAND_SUCCESS : LAUNCH_SUCCESS
          }
        />
        <Cta
          data={"false"}
          filterType={
            type === SUCCESSFUL_LANDING ? LAND_SUCCESS : LAUNCH_SUCCESS
          }
        />
      </div>
    </div>
  )
}
