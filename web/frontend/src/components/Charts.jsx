import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import axios from "../helper/axios";
import Loading from "./Loading";

import AURINHousing from "../resources/AURIN_melb_housing.json";
import AURINLanguage from "../resources/AURIN_melb_language.json";

const sa4 = {
  206: "Melb Inner",
  207: "Melb Inner East",
  208: "Melb Inner South",
  209: "Melb North East",
  210: "Melb North West",
  211: "Melb Outer East",
  212: "Melb South East",
  213: "Melb West",
  214: "Mornington Peninsula",
};

const Charts = () => {
  const [options, SetOptions] = useState(null);
  const [loading, SetLoading] = useState(true);

  useEffect(() => {
    const processLanguageData = (oldRawData, newRawData) => {
      const oldData = [];
      Object.entries(oldRawData).forEach(([index, item]) => {
        oldData.push({ value: item.value, name: item.key[0] });
      });

      const newData = [];
      Object.entries(newRawData).forEach(([index, item]) => {
        newData.push({ value: item.value, name: item.key[0] });
      });

      const options = {
        title: {
          text: "Language Count of Tweets in Melbourne",
          left: "center",
          textStyle: {
            fontSize: 30,
          },
        },
        tooltip: {
          show: true,
          trigger: "item",
        },
        series: [
          {
            name: "Old Twitter Set",
            data: oldData,
            type: "pie",
            smooth: true,
            center: ["20%", "50%"],
            top: "10%",
          },
          {
            name: "New Twitter Set",
            data: newData,
            type: "pie",
            smooth: true,
            center: ["80%", "50%"],
            top: "10%",
          },
        ],
      };

      return options;
    };

    const processHousingData = (oldRawData, newRawData) => {
      const xAxis = [];
      const oldData = [];
      Object.entries(sa4).forEach(([saCode, name]) => {
        xAxis.push(name);
        Object.entries(oldRawData).forEach(([index, item]) => {
          if (item.key[0] === saCode)
            oldData.push(item.value.sum / item.value.count);
        });
      });

      const newData = [];
      Object.entries(sa4).forEach(([saCode, name]) => {
        Object.entries(newRawData).forEach(([index, item]) => {
          if (item.key[0] === saCode)
            newData.push(item.value.sum / item.value.count);
        });
      });

      const options = {
        tooltip: {
          show: true,
          trigger: "item",
        },
        title: {
          text: "Average Sentiment Scores of Tweets Relating to Housing in Melbourne",
          left: "center",
          textStyle: {
            fontSize: 30,
          },
        },
        xAxis: {
          data: xAxis,
          type: "category",
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Old Twitter Set",
            data: oldData,
            type: "bar",
            smooth: true,
          },
          {
            name: "new Twitter Set",
            data: newData,
            type: "bar",
            smooth: true,
          },
        ],
      };

      return options;
    };

    const processAURINLanguageData = () => {
      const dict = {};
      Object.entries(AURINLanguage).forEach(([saCode, data]) => {
        Object.entries(data).forEach(([lang, cnt]) => {
          if (lang !== "Total") dict[lang] = (dict[lang] || 0) + cnt;
        });
      });

      const data = [];
      Object.entries(dict).forEach(([lang, cnt]) => {
        data.push({ value: cnt, name: lang });
      });

      const options = {
        title: {
          text: "Language Statistics from AURIN",
          left: "center",
          textStyle: {
            fontSize: 30,
          },
        },
        tooltip: {
          show: true,
          trigger: "item",
        },
        series: [
          {
            data: data,
            type: "pie",
            smooth: true,
            top: "10%",
          },
        ],
      };

      return options;
    };

    const processAURINHousingData = () => {
      const dataDict = {};
      Object.entries(AURINHousing).forEach(([key, value]) => {
        const saCode = key.substring(0, 3);
        if (dataDict[saCode]) {
          dataDict[saCode].sum = dataDict[saCode].sum + value;
          dataDict[saCode].count = dataDict[saCode].count + 1;
        } else {
          dataDict[saCode] = { sum: value, count: 1 };
        }
      });

      const data = [];
      const xAxis = [];
      Object.entries(sa4).forEach(([saCode, name]) => {
        xAxis.push(name);
        if (dataDict[saCode])
          data.push(dataDict[saCode].sum / dataDict[saCode].count);
        else data.push(0);
      });

      const options = {
        title: {
          text: "Housing Scores from AURIN",
          left: "center",
          textStyle: {
            fontSize: 30,
          },
        },
        tooltip: {
          show: true,
          trigger: "item",
        },
        xAxis: {
          data: xAxis,
          type: "category",
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: data,
            type: "bar",
            smooth: true,
          },
        ],
      };

      return options;
    };

    const fetchData = async () => {
      try {
        const newLang = await axios.get("new_tweets/language?group_level=1");
        const oldLang = await axios.get("old_tweets/language?group_level=1");
        const newHousing = await axios.get("new_tweets/housing?group_level=1");
        const oldHousing = await axios.get("old_tweets/housing?group_level=1");

        const languageOptions = processLanguageData(
          oldLang.data.rows,
          newLang.data.rows
        );
        const housingOptions = processHousingData(
          oldHousing.data.rows,
          newHousing.data.rows
        );

        const AURINlanguageOptions = processAURINLanguageData();
        const AURINhousingOptions = processAURINHousingData();

        SetOptions({
          languageOptions,
          housingOptions,
          AURINlanguageOptions,
          AURINhousingOptions,
        });

        // return language.data.rows;
      } catch (e) {
        alert("Fetch Data Failed!");
        console.log(e);
        return null;
      }
    };

    fetchData();
    SetLoading(false);
  }, []);

  return (
    <div>
      {loading && <Loading />}
      {options && (
        <ReactECharts className="barchart" option={options.housingOptions} />
      )}
      {options && (
        <ReactECharts className="piechart" option={options.languageOptions} />
      )}
      {options && (
        <ReactECharts
          className="barchart"
          option={options.AURINhousingOptions}
        />
      )}
      {options && (
        <ReactECharts
          className="piechart"
          option={options.AURINlanguageOptions}
        />
      )}
    </div>
  );
};

export default Charts;
