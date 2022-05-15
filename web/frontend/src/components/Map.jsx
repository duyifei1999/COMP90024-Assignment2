import React, { useEffect, useState } from "react";

import axios from "../helper/axios";
import featureColor from "../helper/featureColor";
import normalize from "../helper/normalize";

import SA2 from "../resources/SA2_2016_MELB.json";
import SA3 from "../resources/SA3_2016_MELB.json";
import SA4 from "../resources/SA4_2016_MELB.json";
import AURINHousing from "../resources/AURIN_melb_housing.json";

import Loading from "./Loading";
import SuburbDetail from "./SuburbDetail";
import DataSelector from "./DataSelector";

const Map = () => {
  const [loading, SetLoading] = useState(true);
  const [suburb, SetSuburb] = useState(null);
  const [map, SetMap] = useState(null);

  useEffect(() => {
    const initMap = () => {
      SetMap(
        new window.google.maps.Map(document.getElementById("map"), {
          center: { lat: -37.79769851966677, lng: 144.9607993840227 }, // coord of UoM
          zoom: 10,
          mapId: "a84fedb5a34cfce9",
        })
      );
    };

    if (!window.google) {
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.src = `https://maps.google.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`;
      var x = document.getElementsByTagName("script")[0];
      x.parentNode.insertBefore(s, x);
      // Below is important.
      //We cannot access google.maps until it's finished loading
      s.addEventListener("load", (e) => {
        initMap();
      });
    } else {
      initMap();
    }

    SetLoading(false);
  }, []);

  const fetchData = async (db, scenario, saLevel) => {
    try {
      if (scenario === "housing") {
        let query = "".concat(db, "/", scenario, "/");

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
        return null;
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
      return null;
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
      return null;
    }
  };

  const loadGeoJson = (geoJson, scenario) => {
    map.data.addGeoJson(geoJson);
    map.data.setStyle((f) => {
      return {
        strokeWeight: 0.1,
        fillColor: featureColor(f, scenario),
      };
    });

    map.data.addListener("mouseover", (e) => {
      map.data.overrideStyle(e.feature, { strokeWeight: 0.3 });
      SetSuburb(e.feature.getProperty("metaData"));
    });
    map.data.addListener("mouseout", (e) => {
      map.data.revertStyle();
      SetSuburb(null);
    });
  };

  const addDataToMap = async (db, scenario, saLevel) => {
    SetLoading(true);
    clearMap();

    let geoJson;

    if (db !== "aurin") {
      // fetch data from db
      const data = await fetchData(db, scenario, saLevel);
      if (data) {
        geoJson = addPropertiesToFeatures(data, scenario, saLevel);
      }
    } else {
      // directly load AURIN data from resources folder
      geoJson = addAURINPropertiesToFeatures(scenario, saLevel);
    }

    loadGeoJson(geoJson, scenario);
    SetLoading(false);
  };

  const clearMap = () => {
    map.data.forEach((feature) => {
      map.data.remove(feature);
    });
  };

  return (
    <>
      {loading && <Loading />}
      <div className="map-container" id="map" />
      <DataSelector addDataToMap={addDataToMap} />
      <SuburbDetail suburb={suburb} />
    </>
  );
};

export default Map;
