import React, { useEffect, useState } from "react";

import axios from "../helper/axios";
import featureColor from "../helper/featureColor";
import normalize from "../helper/normalize";

import SA2 from "../resources/SA2_2016_MELB.json";
import SA3 from "../resources/SA3_2016_MELB.json";
import SA4 from "../resources/SA4_2016_MELB.json";
// import AURINData from "../resources/AURIN_melb_housing.json";

import Loading from "./Loading";
import SuburbDetail from "./SuburbDetail";

const Map = () => {
  const [loading, SetLoading] = useState(true);
  const [suburb, SetSuburb] = useState(null);
  const [map, SetMap] = useState(null);
  const [data, SetData] = useState({ query: "", features: null });

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

  const fetchData = async (query) => {
    if (query === "/oldTweets/housing") {
      const res = await axios.get(query);
      return res.data.rows;
    }
  };

  const addPropertiesToFeatures = (properties, saLevel) => {
    // console.log(properties);

    let geoJson;
    let codeLength;
    let propertyName;

    switch (saLevel) {
      case 3:
        geoJson = JSON.parse(JSON.stringify(SA3));
        codeLength = 5;
        propertyName = "SA3_CODE16";
        break;
      case 4:
        geoJson = JSON.parse(JSON.stringify(SA4));
        codeLength = 3;
        propertyName = "SA4_CODE16";
        break;
      case 2:
      default:
        geoJson = JSON.parse(JSON.stringify(SA2));
        codeLength = 9;
        propertyName = "SA2_MAIN16";
        break;
    }

    const dict = {};
    for (let i = 0; i < properties.length; i++) {
      const saCode = properties[i].key.substring(0, codeLength);
      if (dict[saCode])
        dict[saCode].raw = dict[saCode].raw + properties[i].value;
      else dict[saCode] = { raw: properties[i].value };
    }
    normalize(dict);

    for (let i = 0; i < geoJson["features"].length; i++) {
      const feature = geoJson["features"][i];
      const saCode = feature["properties"][propertyName];

      if (dict[saCode]) {
        feature["properties"].rawScore = dict[saCode].raw;
        feature["properties"].normalizedScore = dict[saCode].normalized;
      } else {
        feature["properties"].rawScore = 0;
        feature["properties"].normalizedScore = 0;
      }
    }

    return geoJson;
  };

  const addDataToMap = async (query, saLevel) => {
    SetLoading(true);
    clearMap();

    let features;
    if (query !== data.query) {
      features = await fetchData(query);
      SetData({ query, features });
    } else {
      features = data.features;
    }

    const geoJson = addPropertiesToFeatures(features, saLevel);
    map.data.addGeoJson(geoJson);
    map.data.setStyle((f) => {
      return {
        strokeWeight: 0.1,
        fillColor: featureColor(f),
      };
    });

    map.data.addListener("mouseover", (e) => {
      map.data.overrideStyle(e.feature, { strokeWeight: 0.3 });
      const s = {
        name: e.feature.getProperty(`SA${saLevel}_NAME16`),
        rawScore: e.feature.getProperty("rawScore"),
        normalizedScore: e.feature.getProperty("normalizedScore"),
      };
      SetSuburb(s);
      // SetSuburb(e.feature.getProperty("SA2_NAME16"));
    });
    map.data.addListener("mouseout", (e) => {
      map.data.revertStyle();
      SetSuburb(null);
    });

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
      <button onClick={clearMap}>Clear</button>
      <button
        onClick={() => {
          addDataToMap("/oldTweets/housing", 2);
        }}
      >
        Old Tweets Housing SA2
      </button>
      <button
        onClick={() => {
          addDataToMap("/oldTweets/housing", 3);
        }}
      >
        Old Tweets Housing SA3
      </button>
      <button
        onClick={() => {
          addDataToMap("/oldTweets/housing", 4);
        }}
      >
        Old Tweets Housing SA4
      </button>
      <button
        onClick={() => {
          addDataToMap("/oldTweets/language", 4);
        }}
      >
        Old Tweets Language SA4
      </button>
      <div className="map-container" id="map" />
      <SuburbDetail suburb={suburb} />
    </>
  );
};

export default Map;
