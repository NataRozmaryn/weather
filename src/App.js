import React from "react";
import AddCity from "./components/AddCity/AddCity";
import CityList from "./components/CityList/CityList";
import WeatherList from "./components/WeatherList/WeatherList";
import ResponsiveNavBar from "./components/Navbar/ResponsiveNavbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DetailWeather from "./components/DetailWeather/DetailWeather";
import Forecast from "./components/Forecast/Forecast";
import "./styles.css";
import "./styles/styles.scss";
import { Button } from "@material-ui/core";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact render={() => (
          <div className="app" id="app">
            <ResponsiveNavBar />
            <h1 className="title">Weather</h1>
            {/* <AddCity /> */}
            {/* <CityList /> */}
            <WeatherList />
          </div>
        )}>
        </Route>
        <Route path="/city" render={({ match, history, location }) => (
          <div className="app" id="app">
            <Button onClick={() => { history.goBack(); }}>&#10096; back</Button>
            <DetailWeather  location={location} match={match}/>
          </div>)}>
        </Route>
        <Route path="/cityforecast" render={({ match, history, location }) => (
          <div className="app" id="app">
            <Button onClick={() => { history.goBack(); }}>&#10096; back</Button>
            <Forecast  location={location} match={match}/>
          </div>)}>
        </Route>
      </Switch>
    </Router>
  );
}
