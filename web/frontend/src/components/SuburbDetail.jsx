import React from "react";
import { useEffect } from "react";

const SuburbDetail = ({ suburb }) => {
  useEffect(() => {}, [suburb]);

  console.log(suburb);

  return (
    <div
      className={
        suburb ? "suburb-container" : "suburb-container suburb-container--empty"
      }
    >
      {suburb && <h1>{suburb.name}</h1>}
      {suburb && <h3>Raw Mean: {suburb.mean ? suburb.mean.toFixed(2) : 0}</h3>}
      {suburb && (
        <h3>
          Normalized Mean:{" "}
          {suburb.normalizedMean ? suburb.normalizedMean.toFixed(2) : 0}
        </h3>
      )}
      {suburb && <h3>Sum: {suburb.count ? suburb.sum.toFixed(2) : 0}</h3>}
      {suburb && <h3>Count: {suburb.count ? suburb.count : 0}</h3>}
      {suburb && <h3>Min Value: {suburb.min ? suburb.min.toFixed(2) : 0}</h3>}
      {suburb && <h3>Max Value: {suburb.max ? suburb.max.toFixed(2) : 0}</h3>}
    </div>
  );
};

export default SuburbDetail;
