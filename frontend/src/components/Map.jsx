import React, { useEffect, useState } from "react";
import jsonData from "../resources/sa2.json";
import Loading from "./Loading";
import SuburbDetail from "./SuburbDetail";

const Map = () => {
  const [loading, SetLoading] = useState(true);
  const [suburb, SetSuburb] = useState("");

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
    });

    // TODO: get the data from the backend
    const suburbs = JSON.parse(JSON.stringify(jsonData));
    map.data.addGeoJson(suburbs);

    map.data.setStyle((f) => {
      // TODO: color the suburb based on its weight
      return {
        strokeWeight: 1,
        fillColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
      };
    });

    map.data.addListener("mouseover", (e) => {
      map.data.overrideStyle(e.feature, { strokeWeight: 2 });
      SetSuburb(e.feature.getProperty("sa2_name"));
      // SetSuburb(e.feature.getProperty("SSC_NAME"));
    });
    map.data.addListener("mouseout", (e) => {
      map.data.revertStyle();
      SetSuburb("");
    });

    setTimeout(() => {
      SetLoading(false);
    }, 1000);
  };

  return (
    <>
      {loading && <Loading />}
      <div className="map-container" id="map" />
      <SuburbDetail suburb={suburb} />
    </>
  );
};

export default Map;
