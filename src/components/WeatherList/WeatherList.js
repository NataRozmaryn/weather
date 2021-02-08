import React from "react";
import { connect } from "react-redux";
import Weather from "../Weather/Weather";


const WeatherList = ({ cities }) => {
  return (
    <div className="weather-list">
      {cities && cities.length ? cities.map((city, index) => {
        return <Weather key={`weather-${index}`} city={city} />;
      })
        : ""}
    </div>
  );
}

const mapStateToProps = state => {
  const cities = Object.values(state.cities_reducer).filter(item =>
    item.enabled);
  return { cities };
};
export default connect(mapStateToProps)(WeatherList);

