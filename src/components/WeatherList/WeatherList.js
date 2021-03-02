import React from "react";
import { connect } from "react-redux";
import WeatherContainer from "../Weather/WeatherContainer";


const WeatherList = ({ cities }) => {
  return (
    <div className="weather-list">
      {cities && cities.length ? cities.map((city, index) => {
        return <WeatherContainer key={`weather-${index}`} city={city} />;
      })
        : ""}
    </div>
  );
}

const mapStateToProps = state => {
  const cities = Object.values(state.cities).filter(item =>
    item.enabled);
  return { cities };
};
export default connect(mapStateToProps)(WeatherList);

