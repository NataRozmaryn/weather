import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { remCityFromMonitoring, toggleCityMonitoring } from "../../redux/reducers/cities_actions";

const City = ({ city, toggleCityMonitoring: toggleCity, remCityFromMonitoring: deleteCity, cityId }) => (
  <button className="city-item" >
    <span onClick={() => toggleCity(cityId)}
      className={cx(
        "city-item__text",
        city && city.enabled && "city-item__text--selected"
      )}
    >
      {city.name}
    </span> <span onClick={() => deleteCity(cityId)}>   x</span>
  </button>
);

export default connect(
  null,
  { toggleCityMonitoring, remCityFromMonitoring }
)(City);