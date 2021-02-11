import React, { useEffect, useReducer } from "react";
import { Link, Route } from "react-router-dom";
import { connect } from "react-redux";
import cx from "classnames";
import { getWeather } from "../../redux/reducers/weather_actions";
import moment from 'moment';
// import refrashIcon from "../../icons/refresh.svg";
import RefreshIcon from "../RefreshIcon";
import DetailWeather from '../DetailWeather/DetailWeather';


const Weather = ({ city, getCityWeather, weather }) => {
  const currentDate = () => {//debugger;
    return moment().utc().add(weather.timezone, 'seconds').format('dddd HH:mm')
  }

  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  function handleRefresh() {
    forceUpdate();
  }

  useEffect(() => {
    getCityWeather(city);
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
        {city ? `City of ${city.name}` : ''}
      </h2>
      <h3 className="weather__time">
        {currentDate()}
      </h3>
      {weather
        ?
        <h3 className="weather__temperature">
          {weather &&
            <img alt="" src={weatherUrl} />}
          {Math.round(temp * 100) / 100}
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
            {/* {weather.weather[0].main}, {weatherDescription} */}
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
      <RefreshIcon onClick={handleRefresh} />
      <Link to={{pathname: `/${city.name}`, state: {city}}} > Get detail weather </Link> 
      {/* <Route path={`/${city.name}`} component={DetailWeather} city={city}> Get detail weather </Route>  */}
    </div>
  )
};

const mapDispatchToProps = (dispatch) => ({
  getCityWeather: (city) => getWeather(dispatch, city)
});

const mapStateToProps = (state, props) => {
  const cityWeather = state.weather_reducer[props.city.id];
  const weather = cityWeather ? cityWeather.weatherData : null;
  return { weather };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Weather);