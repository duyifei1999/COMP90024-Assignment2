import React from "react";
import { useEffect } from "react";

const SuburbDetail = ({ suburb }) => {
  useEffect(() => {}, [suburb]);

  return (
    <div
      className={
        suburb === ""
          ? "suburb-container suburb-container--empty"
          : "suburb-container"
      }
    >
      <h1>{suburb}</h1>
      {suburb !== "" && (
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum
          possimus quam laudantium dignissimos cupiditate veritatis, magnam sint
          delectus quasi repudiandae.
        </p>
      )}
    </div>
  );
};

export default SuburbDetail;
