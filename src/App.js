import React from "react";
import AddCity from "./components/AddCity/AddCity";
import CityList from "./components/CityList/CityList";
import WeatherList from "./components/WeatherList/WeatherList";
import "./styles.css";
import "./styles/styles.scss";

export default function App() {
  return (
    <div className="app">
      <h1 className="title">Weather</h1>
      <AddCity />
      <CityList />
      <WeatherList />
    </div>
  );
}
