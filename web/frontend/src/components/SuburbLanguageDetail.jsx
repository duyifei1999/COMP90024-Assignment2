import React, { useEffect } from "react";
import * as echarts from "echarts";

var myChart;

const SuburbHousingDetail = ({ suburb }) => {
  const pieview = ({suburb}) => {
    if (myChart != null && myChart != "" && myChart != undefined) {
        myChart.dispose();
    }

    var chartDom = document.getElementById('piecharts');
    myChart = echarts.init(chartDom);
    var option;
    let dataset = suburb;
    delete dataset.Total;
    delete dataset.saCode;
    delete dataset.name;
    delete dataset.scenario;
    var arr = new Array();
    console.log("test!!!!!!!!!");
    for (var key in dataset){
      arr.push({"value":dataset[key],"name":key});
    }
    option = {
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: arr,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    option && myChart.setOption(option);
  }

  useEffect(() => {
    pieview({suburb},[suburb])
  });

  return (
    <>
      {suburb && <h1>{suburb.name}</h1>}
      {suburb && <div id="piecharts"  style={{ width: 300, height: 300 }}/>}
    </>
    );
};

export default SuburbHousingDetail;
