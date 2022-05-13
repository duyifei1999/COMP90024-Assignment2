import React, { useEffect, useState } from "react";
import jsonData from "../resources/SA2_2016.json";
import Loading from "./Loading";
import SuburbDetail from "./SuburbDetail";
import AURINData from "../resources/AURIN_melb_housing.json";

const COLORMIN = [255, 255, 255, 0];
const COLORMAX = [225, 108, 88, 255];

const featureColor = (f) => {
  const fraction = (AURINData[f.getProperty("SA2_MAIN16")] + 1) / 2 || 0;
  const R = Math.floor((COLORMAX[0] - COLORMIN[0]) * fraction) + COLORMIN[0];
  const G = Math.floor((COLORMAX[1] - COLORMIN[1]) * fraction) + COLORMIN[1];
  const B = Math.floor((COLORMAX[2] - COLORMIN[2]) * fraction) + COLORMIN[2];
  const A = Math.floor((COLORMAX[3] - COLORMIN[3]) * fraction) + COLORMIN[3];
  return `rgba(${R}, ${G}, ${B}, ${A})`;
};

const Map = () => {
  const [loading, SetLoading] = useState(true);
  const [suburb, SetSuburb] = useState("");
  const [mapObj, SetMapObj] = useState(null);

  useEffect(() => {
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
  }, []);

  const initMap = () => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: -37.79769851966677, lng: 144.9607993840227 }, // coord of UoM
      zoom: 10,
      mapId: "a84fedb5a34cfce9",
    });

    setTimeout(() => {
      SetLoading(false);
    }, 1000);

    SetMapObj(map);
  };

  const loadAURIN = () => {
    SetLoading(true);

    // TODO: get the data from the backend
    const suburbs = JSON.parse(JSON.stringify(jsonData));
    mapObj.data.addGeoJson(suburbs);

    mapObj.data.setStyle((f) => {
      return {
        strokeWeight: 0.1,
        fillColor: featureColor(f),
      };
    });

    mapObj.data.addListener("mouseover", (e) => {
      mapObj.data.overrideStyle(e.feature, { strokeWeight: 0.3 });
      SetSuburb(e.feature.getProperty("SA2_NAME16"));
      // SetSuburb(e.feature.getProperty("SSC_NAME"));
    });
    mapObj.data.addListener("mouseout", (e) => {
      mapObj.data.revertStyle();
      SetSuburb("");
    });

    SetLoading(false);
  };

  return (
    <>
      {loading && <Loading />}
      <button onClick={loadAURIN}>Test</button>
      <div className="map-container" id="map" />
      <SuburbDetail suburb={suburb} />
    </>
  );
};

export default Map;
