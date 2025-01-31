import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router";
import LocationDetails from "./pages/LocationDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="location-details" element={<LocationDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
