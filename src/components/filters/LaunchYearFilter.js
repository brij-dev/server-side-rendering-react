import React from 'react'

// CONSTANTS
import { YEAR_RANGE, YEAR } from "../../constants";

// CSS
import "./LaunchYearFilter.css";

// COMPONENTS
import Cta from "../Cta";


export default function LaunchYearFilter() {
  const years = new Array(YEAR_RANGE[1] - YEAR_RANGE[0])
    .fill(YEAR_RANGE[0])
    .map((year, i) => year + i);
  return (
    <div className="launch-year-filter">
      <h3>Launch year</h3>

      <hr />

      <div className="years-container">
        {years.map(year => {
          return (
            <Cta
              data={`${year}`}
              key={year}
              filterType={YEAR}
            />
          )
        })}
      </div>
    </div>
  )
}
