import React, { useEffect } from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { getWeatherByCityAction } from "../../redux/actions";
import City from "../City/City";

const Weather = ({city, getWeatherByCityAction: propsGetWeatherByCityAction, weather}) => { 
  //const weather = getHourlyWeather(city.content);
  //console.log(weather);

  useEffect(() => {
    propsGetWeatherByCityAction(city);
  }, []);

  console.log("Weather", weather)
  let temp;
  if (weather) {
    temp = weather.main.temp - 273.15;
  };

  return (
   
  <div className="city-item">
    <span
      className={cx(
        "city-item__text",
        city && city.selected && "city-item__text--selected"
      )}
    >
       {city.content}
    </span> 
    <p> {Math.round(temp * 100)/100} </p>
    <p> wind speed: {weather && weather.wind.speed} </p>
  </div>
)};

const mapDispatchToProps = {
  getWeatherByCityAction
}
const mapStateToProps = (state, props) => {
  const { weather } = state;
  console.log("1", weather.cities);
  return {weather: weather.cities[props.city.id]};
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Weather);
//export default Weather;