import React from "react";

const SuburbHousingDetail = ({ suburb }) => {
  return (
    <>
      {suburb && <h1>{suburb.name}</h1>}
      {suburb && <h3>Raw Mean: {suburb.mean.toFixed(2)}</h3>}
      {suburb && <h3>Normalized Score: {suburb.normalizedScore.toFixed(2)}</h3>}
      {suburb && <h3>Sum: {suburb.sum.toFixed(2)}</h3>}
      {suburb && <h3>Count: {suburb.count}</h3>}
      {suburb && <h3>Min Value: {suburb.min.toFixed(2)}</h3>}
      {suburb && <h3>Max Value: {suburb.max.toFixed(2)}</h3>}
    </>
  );
};

export default SuburbHousingDetail;
