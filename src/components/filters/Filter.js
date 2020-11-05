import React from "react";

// CONSTANTS
import { SUCCESSFUL_LANDING, SUCCESSFUL_LAUNCH } from "../../constants";

//CSS
import './Filter.css';

// COMPONENTS
import LaunchYearFilter from "./LaunchYearFilter";
import FilterCta from "./FilterCta";

const Filter = () => {
  return (
    <section className="filter-container">
      <h2>Filters</h2>
      <LaunchYearFilter />
      <FilterCta
        type={SUCCESSFUL_LAUNCH}
      />
      <FilterCta
        type={SUCCESSFUL_LANDING}
      />
    </section>
  )
}

export default Filter;