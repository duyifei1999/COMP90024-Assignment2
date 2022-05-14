import React from "react";
import SuburbHousingDetail from "./SuburbHousingDetail";
import SuburbLanguageDetail from "./SuburbLanguageDetail";

const SuburbDetail = ({ suburb }) => {
  return (
    <div
      className={
        suburb ? "suburb-container" : "suburb-container suburb-container--empty"
      }
    >
      {suburb && suburb.category === "housing" && (
        <SuburbHousingDetail suburb={suburb} />
      )}
      {suburb && suburb.category === "language" && (
        <SuburbLanguageDetail suburb={suburb} />
      )}
    </div>
  );
};

export default SuburbDetail;
