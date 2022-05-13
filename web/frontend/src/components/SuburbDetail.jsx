import React from "react";
import { useEffect } from "react";

const SuburbDetail = ({ suburb }) => {
  useEffect(() => {}, [suburb]);

  return (
    <div
      className={
        suburb ? "suburb-container" : "suburb-container suburb-container--empty"
      }
    >
      {suburb && <h1>{suburb.name}</h1>}
      {suburb && <h3>Averaged Score: {suburb.rawScore}</h3>}
      {suburb && <h3>Normalized Score: {suburb.normalizedScore}</h3>}
    </div>
  );
};

export default SuburbDetail;
