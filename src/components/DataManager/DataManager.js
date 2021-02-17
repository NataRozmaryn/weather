import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getCity } from "../../redux/reducers/cities_actions";


const DataManager = ({ city, searchCity }) => {
  useEffect(() => {
    //debugger;
    searchCity(city);
  }, [city]);

  return <></>;
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchCity: (cityName) => getCity(dispatch, cityName)
  }
}
export default connect(
  null,
  mapDispatchToProps
)(DataManager);