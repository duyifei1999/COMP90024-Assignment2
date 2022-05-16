import React from "react";
import ReactECharts from "echarts-for-react";

const SuburbLanguageDetail = ({ suburb }) => {
  const data = [];

  Object.entries(suburb.language).forEach(([lang, count]) => {
    data.push({ value: count, name: lang });
  });

  const options = {
    tooltip: {
      show: true,
      trigger: "item",
    },
    series: [
      {
        data: data,
        type: "pie",
        smooth: true,
      },
    ],
  };

  return (
    <>
      {suburb && <h1>{suburb.name}</h1>}
      {suburb && <ReactECharts option={options} />}
    </>
  );
};

export default SuburbLanguageDetail;
