import React from "react";
import { connect } from "react-redux";
import City from "../City/City";

const CityList = ({ cities }) => (
  <div className="city-list">
    {cities
      ? Object.keys(cities).map((id) => {
        let city = cities[id];
        console.log("list", city);
        return <City key={`todo-${id}`} cityId={id} city={city} />;
      })
      : ""}
  </div>
);

const mapStateToProps = state => {
  let keys = Object.keys(state);
  return { cities: state.cities, keys };
};

export default connect(mapStateToProps)(CityList);