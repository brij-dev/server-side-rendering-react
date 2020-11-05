import React from 'react';

import "./CardView.css";

export default function CardView({ data }) {
  if (!data || typeof data !== "object") {
    return null
  }
  return (
    <div className="card-view">
      {data.links &&
        data.links.mission_patch_small &&
        <img loading="lazy" src={data.links.mission_patch_small} alt={data.mission_name} />}

      {data.mission_name && data.flight_number && <h4>{`${data.mission_name} #${data.flight_number}`}</h4>}

      {data.mission_id && data.mission_id.length ? (
        <div className="misson-id-container">
          <p className="heading">Mission Ids:</p>
          <ul>
            {data.mission_id.map(id => {
              return <li heading={id}>{id}</li>
            })}
          </ul>
        </div>
      ) : null}

      {data.launch_year ? (
        <div className="row">
          <p className="heading">Launch Year:</p>
          <p className="paragraph">{data.launch_year}</p>
        </div>
      ) : null}

      <div className="row">
        <p className="heading">Successful Launch:</p>
        <p className="paragraph">{JSON.stringify(!!data.launch_success)}</p>
      </div>

      <div className="row">
        <p className="heading">Successful Landing:</p>
        <p className="paragraph">{JSON.stringify(!!data.launch_landing)}</p>
      </div>
    </div>
  )
}
