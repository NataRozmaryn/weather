import React from "react";
import AddCity from "./components/AddCity/AddCity";
import CityList from "./components/CityList/CityList";
import WeatherList from "./components/WeatherList/WeatherList";
import VisibilityFilters from "./components/VisibilityFilters/VisibilityFilters";
import "./styles.css";

export default function App() {
  return (
    <div className="app">
      <h1>Weather</h1>
      <AddCity />
      <CityList />
      <VisibilityFilters />
      <WeatherList />
    </div>
  );
}
