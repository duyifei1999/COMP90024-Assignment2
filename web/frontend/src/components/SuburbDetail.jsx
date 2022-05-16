import React from "react";
import SuburbHousingDetail from "./SuburbHousingDetail";
import SuburbLanguageDetail from "./SuburbLanguageDetail";

const SuburbDetail = ({ suburb, handleClose }) => {
  return (
    <div
      className={
        suburb ? "suburb-container" : "suburb-container suburb-container--empty"
      }
      onClick={handleClose}
    >
      {suburb && suburb.scenario === "housing" && (
        <SuburbHousingDetail suburb={suburb} />
      )}
      {suburb && suburb.scenario === "language" && (
        <SuburbLanguageDetail suburb={suburb} />
      )}
      {/* {suburb && (
        <button className="suburb-button-close" onClick={handleClose}>
          X
        </button>
      )} */}
    </div>
  );
};

export default SuburbDetail;
