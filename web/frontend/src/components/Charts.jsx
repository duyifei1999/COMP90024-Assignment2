import Piecharts from "./PieCharts";
import Linecharts from "./LineCharts";
import Barcharts from "./BarCharts";

const Charts = () => {

/*  const fetchData = async (db, scenario, saLevel) => {
    try {
      if (scenario === "housing") {
        let query = "".concat(db, "/", scenario);

        switch (saLevel) {
          case 3:
            query = query.concat("?group_level=2");
            break;
          case 4:
            query = query.concat("?group_level=1");
            break;
          case 2:
          default:
            query = query.concat("?group_level=3");
            break;
        }
        console.log(query);
        // console.log(saLevel);
        const res = await axios.get(query);
        return res.data.rows;
      } else {
        // TODO: fetch language data
        let query = "".concat(db, "/", scenario);

        switch (saLevel) {
          case 3:
            query = query.concat("?group_level=3");
            break;
          case 4:
            query = query.concat("?group_level=2");
            break;
          case 2:
          default:
            query = query.concat("?group_level=4");
            break;
        }
        console.log(query);
        // console.log(saLevel);
        const res = await axios.get(query);
        return res.data.rows;
      }
    } catch (e) {
      alert("Fetch Data Failed!");
      console.log(e);
      return null;
    }
  };

  const addPropertiesToFeatures = (properties, scenario, saLevel) => {
    if (scenario === "housing") {
      let geoJson;
      let keyPos;
      let propertyName;

      switch (saLevel) {
        case 3:
          geoJson = JSON.parse(JSON.stringify(SA3));
          keyPos = 1;
          propertyName = "SA3_CODE16";
          break;
        case 4:
          geoJson = JSON.parse(JSON.stringify(SA4));
          keyPos = 0;
          propertyName = "SA4_CODE16";
          break;
        case 2:
        default:
          geoJson = JSON.parse(JSON.stringify(SA2));
          keyPos = 2;
          propertyName = "SA2_MAIN16";
          break;
      }

      const dict = {};
      for (let i = 0; i < properties.length; i++) {
        const item = properties[i];
        const key = item.key[keyPos];
        dict[key] = item.value;
        dict[key].mean = dict[key].sum / dict[key].count;
      }
      normalize(dict);

      for (let i = 0; i < geoJson.features.length; i++) {
        const feature = geoJson.features[i];
        const saCode = feature.properties[propertyName];

        feature.properties.metaData = { ...dict[saCode] };
        feature.properties.metaData.saCode = saCode;
        feature.properties.metaData.name =
          feature.properties[`SA${saLevel}_NAME16`];
        feature.properties.metaData.scenario = scenario;
      }

      return geoJson;
    } else {
      // TODO: process language data
      let geoJson;
      let keyPos;
      let propertyName;

      switch (saLevel) {
        case 3:
          geoJson = JSON.parse(JSON.stringify(SA3));
          keyPos = 2;
          propertyName = "SA3_CODE16";
          break;
        case 4:
          geoJson = JSON.parse(JSON.stringify(SA4));
          keyPos = 1;
          propertyName = "SA4_CODE16";
          break;
        case 2:
        default:
          geoJson = JSON.parse(JSON.stringify(SA2));
          keyPos = 3;
          propertyName = "SA2_MAIN16";
          break;
      }

      const dict = {};
      for (let i = 0; i < properties.length; i++) {
        const item = properties[i];
        const key = item.key[keyPos];
        if (dict[key]) {
          dict[key][item.key[keyPos]] = item.value;
        }else {
          dict[key] = {}
          dict[key][item.key[keyPos]] = item.value;
        }
      }

      for (let i = 0; i < geoJson.features.length; i++) {
        const feature = geoJson.features[i];
        const saCode = feature.properties[propertyName];

        feature.properties.metaData = { ...dict[saCode] };
        feature.properties.metaData.saCode = saCode;
        feature.properties.metaData.name =
          feature.properties[`SA${saLevel}_NAME16`];
        feature.properties.metaData.scenario = scenario;
      }
      return geoJson;
    }
  };

  const addAURINPropertiesToFeatures = (scenario, saLevel) => {
    if (scenario === "housing") {
      let geoJson;
      let keyLength;
      let propertyName;

      switch (saLevel) {
        case 3:
          geoJson = JSON.parse(JSON.stringify(SA3));
          keyLength = 5;
          propertyName = "SA3_CODE16";
          break;
        case 4:
          geoJson = JSON.parse(JSON.stringify(SA4));
          keyLength = 3;
          propertyName = "SA4_CODE16";
          break;
        case 2:
        default:
          geoJson = JSON.parse(JSON.stringify(SA2));
          keyLength = 9;
          propertyName = "SA2_MAIN16";
          break;
      }

      const dict = {};
      Object.entries(AURINHousing).forEach(([saCode, score]) => {
        const key = saCode.substring(0, keyLength);
        if (dict[key]) {
          dict[key].sum += score;
          dict[key].count += 1;
          dict[key].min = dict[key].min < score ? dict[key].min : score;
          dict[key].max = dict[key].max > score ? dict[key].max : score;
        } else {
          dict[key] = {};
          dict[key].sum = score;
          dict[key].count = 1;
          dict[key].min = score;
          dict[key].max = score;
        }
      });

      Object.keys(dict).forEach((key) => {
        dict[key].mean = dict[key].sum / dict[key].count;
      });
      normalize(dict);

      for (let i = 0; i < geoJson.features.length; i++) {
        const feature = geoJson.features[i];
        const saCode = feature.properties[propertyName];

        feature.properties.metaData = { ...dict[saCode] };
        feature.properties.metaData.saCode = saCode;
        feature.properties.metaData.name =
          feature.properties[`SA${saLevel}_NAME16`];
        feature.properties.metaData.scenario = scenario;
      }

      return geoJson;
    } else {
      // TODO: process language data
      let geoJson;
      let keyLength;
      let propertyName;

      switch (saLevel) {
        case 3:
          geoJson = JSON.parse(JSON.stringify(SA3));
          keyLength = 5;
          propertyName = "SA3_CODE16";
          break;
        case 4:
          geoJson = JSON.parse(JSON.stringify(SA4));
          keyLength = 3;
          propertyName = "SA4_CODE16";
          break;
        case 2:
        default:
          geoJson = JSON.parse(JSON.stringify(SA2));
          console.log(geoJson);
          keyLength = 9;
          propertyName = "SA2_MAIN16";
          break;
      }

      const dict = {};
      Object.entries(AURINLanguage).forEach(([saCode, data]) => {
        const key = saCode.substring(0, keyLength);
        if (dict[key]) {
          for (var lang in data) {
            if (data.hasOwnProperty(lang)) {
              dict[key][lang] += data[lang];
            }
          }
        } else {
          dict[key] = {};
          for (var lang in data) {
            if (data.hasOwnProperty(lang)) {
              dict[key][lang] = data[lang];
            }
          }
        }
      });

      for (let i = 0; i < geoJson.features.length; i++) {
        const feature = geoJson.features[i];
        const saCode = feature.properties[propertyName];
        feature.properties.metaData = { ...dict[saCode] };
        feature.properties.metaData.saCode = saCode;
        feature.properties.metaData.name =
          feature.properties[`SA${saLevel}_NAME16`];
        feature.properties.metaData.scenario = scenario;
      }

      return geoJson;
    }
  };
*/
  return (
    <div>
      <div style={{ display: "inline-block", width: "100vw", height: "50vh"}}>
        <Linecharts />
      </div>
      <div style={{ display: "inline-block", width: "50vw", height: "150vh"}}>
        <Barcharts />
      </div>
    </div>
  );
};

export default Charts;

