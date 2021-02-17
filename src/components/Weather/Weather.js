import React, { useEffect } from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { getWeather } from "../../redux/reducers/weather_actions";
import moment from 'moment';
// import refrashIcon from "../../icons/refresh.svg";
import RefreshIcon from "../RefreshIcon";
import DetailWeather from '../DetailWeather/DetailWeather';
import { Button } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Forecast from "../Forecast/Forecast";

const Weather = ({ city, getCityWeather, weather }) => {
  const currentDate = () => {
    return moment().utc().add(weather.timezone, 'seconds').format('dddd HH:mm')
  }

  function handleRefresh() {
    getCityWeather(city);
  }

  useEffect(() => {
    getCityWeather(city);
    let interval = setInterval(handleRefresh, 60000)
    return () => { clearInterval(interval) };
  }, [city.id]);

  if (!weather || weather.isLoading) {
    return (
      <div className="weather-item">
        Loading...
      </div>
    )
  }

  console.log("Weather", { city, weather: weather });
  let temp;
  let weatherIcon = weather && weather.weather[0].icon;
  let weatherDescription = weather && weather.weather[0].description
  let weatherUrl = weather && "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

  if (weather) {
    temp = weather.main.temp - 273.15;
  };

  return (
    <div className="weather">
      <h2 className="weather__city">
        <Link to={{ pathname: `/cityforecast`, state: { city } }} >{city ? `${city.name}` : ''} </Link>
      </h2>
      <h3 className="weather__time">
        {currentDate()}
      </h3>
      {weather
        ?
        <h3 className="weather__temperature">
          {weather &&
            <img alt="" src={weatherUrl} />}
          {Math.round(temp)}
          <span className="metric">°C</span>
        </h3>
        : null
      }
      <article className="weather__weather">
        <h4 className="weather__weather__title">
          <span className="weather__weather__label">
            Current conditions:
          </span>
          <strong className="current__weather__conditions">
            {weatherDescription}
          </strong>
        </h4>
      </article>
      <p
        className={cx(
          "city-item__text",
          city && city.enabled && "city-item__text--selected"
        )}
      >
        {city.content}
      </p>
      <p> wind: <strong>{weather && weather.wind.speed} <span>m/s</span></strong> </p>
      <Route path="/cityforecast" render={({ match, history, location }) => (
        <div className="app" id="app">
          <Button onClick={() => { history.goBack(); }}>&#10096; back</Button>
          <Forecast location={location} match={match} />
        </div>)}>
      </Route>
      <DetailWeather city={city.name} short />
      <Link to={{ pathname: `/city/${city.name}`, state: { city } }} > show more </Link>
    </div>
  )
};

const mapDispatchToProps = (dispatch) => ({
  getCityWeather: (city) => getWeather(dispatch, city)
});

const mapStateToProps = (state, props) => {
  const cityWeather = state.weather[props.city.id];
  const weather = cityWeather ? cityWeather.weatherData : null;
  return { weather };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Weather);