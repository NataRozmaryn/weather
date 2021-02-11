import React from "react";
import AddCity from "./components/AddCity/AddCity";
import CityList from "./components/CityList/CityList";
import WeatherList from "./components/WeatherList/WeatherList";
import ResponsiveNavBar from "./components/Navbar/ResponsiveNavbar";
import { BrowserRouter as Router,Switch, Route, Link } from "react-router-dom";
import routes from './routes';
import DetailWeather from "./components/DetailWeather/DetailWeather";
import "./styles.css";
import "./styles/styles.scss";

export default function App() {
  const city_props = { id: 4736096, name: "Texarkana"};
  return (
    <Router>
      <Switch>
        <div className="app" id="app">
        <ResponsiveNavBar />
          <h1 className="title">Weather</h1>
          <AddCity />
          <CityList />
          <WeatherList />
          <DetailWeather city={ city_props} />
        </div>
        </Switch>
    </Router>
  );
}
