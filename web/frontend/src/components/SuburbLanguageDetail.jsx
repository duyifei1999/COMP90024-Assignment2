import React from "react";

const SuburbHousingDetail = ({ suburb }) => {
  return <>{suburb && <h1>{suburb.name}</h1>}</>;
};

export default SuburbHousingDetail;
