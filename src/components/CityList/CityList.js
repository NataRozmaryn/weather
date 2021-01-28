import React from "react";
import { connect } from "react-redux";
import City from "../City/City";
import { getCitiesByVisibilityFilter } from "../../redux/selectors";
import { VISIBILITY_FILTERS } from "../../constants";

const CityList = ({ cities }) => (
  <ul className="todo-list">
    {cities && cities.length
      ? cities.map((city, index) => {
          return <City key={`todo-${city.id}`} city={city} />;
        })
      : "empty"}
  </ul>
);

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  const cities = getCitiesByVisibilityFilter(state, visibilityFilter);
  return { cities };
};
export default connect(mapStateToProps)(CityList);
