import { Route, Routes } from "react-router-dom";
import Charts from "./components/Charts";
import Map from "./components/Map";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="map" element={<Map />} />
        <Route path="charts" element={<Charts />} />
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
