import React from "react";
import WeatherList from "./components/WeatherList/WeatherList";
import ResponsiveNavBar from "./components/Navbar/ResponsiveNavbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Forecast from "./components/Forecast/Forecast";
import "./styles.css";
import "./styles/styles.scss";
import { Button } from "@material-ui/core";
import DetailWeatherContainer from "./components/DetailWeather/DetailWeatherContainer";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact render={() => (
          <div className="app" id="app">
            <ResponsiveNavBar />
            <h1 className="title">Weather</h1>
            <WeatherList />
          </div>
        )}>
        </Route>
          <Route path="/city/:cityName" render={({ match, history, location }) => (
          <div className="app" id="app">
            <Button onClick={() => { history.goBack(); }}>&#10096; back</Button>
            <DetailWeatherContainer city={match?.params?.cityName}/>
          </div>)}>
        </Route>
        <Route path="/cityforecast/:cityName" render={({ match, history }) => (
          <div className="app" id="app">
            <Button onClick={() => { history.goBack(); }}>&#10096; back</Button>
            <Forecast  city={match?.params?.cityName}/>
          </div>)}>
        </Route>
      </Switch>
    </Router>
  );
}
