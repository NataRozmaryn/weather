import React, { useEffect } from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { getWeatherByCityAction } from "../../redux/actions";
import {getHourlyWeather} from "../../api/weather_api"

const Weather = (props) => { 
  //const weather = getHourlyWeather(city.content);
  //console.log(weather);

  useEffect(() => {
    props.getWeatherByCityAction(props.city);
  }, [props.getWeatherByCityAction]);

  return (
  
  <div className="city-item" onClick={() => props.toggleCity(props.city.id)}>
    <span
      className={cx(
        "city-item__text",
        props.city && props.city.selected && "city-item__text--selected"
      )}
    >
       {props.city.content} 
    </span> 
  </div>
)};

const mapDispatchToProps = {
  getWeatherByCityAction
}
const mapStateToProps = state => {
  const { weather } = state;
  console.log("1", weather.cities);
  return weather.cities;
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Weather);
//export default Weather;