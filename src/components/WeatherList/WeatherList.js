import React from "react";
import { connect } from "react-redux";
import Weather from "../Weather/Weather";
import { getCitiesByVisibilityFilter } from "../../redux/selectors";
import { VISIBILITY_FILTERS } from "../../constants";

const WeatherList = ({ cities }) => (
  <ul className="todo-list">
    {cities && cities.length
      ? cities.map((city, index) => {
          return <Weather key={`todo-${city.id}`} city={city} />;
        })
      : ":-)"}
  </ul>
);

const mapStateToProps = state => {
  //const { visibilityFilter } = state;
  const cities = getCitiesByVisibilityFilter(state, VISIBILITY_FILTERS.SELECTED);
  return { cities };
};
export default connect(mapStateToProps)(WeatherList);
