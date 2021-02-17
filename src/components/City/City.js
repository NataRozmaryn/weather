import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { remCityFromMonitoring, toggleCityMonitoring } from "../../redux/reducers/cities_actions";
import CloseIcon from "../CloseIcon";
import Button from '@material-ui/core/Button';

const City = ({ city, toggleCityMonitoring: toggleCity, remCityFromMonitoring: deleteCity, cityId }) => {
  const classname = "search-bar__control " + (city.enabled ? "selected" : "unselected");

  return (
    <Button className={classname} size="small" fontSize="small">
      <span onClick={() => toggleCity(cityId)}
        className={cx(
          "city-item__text",
          city && city.enabled && "city-item__text--selected"
        )}
      >
        {city.name}
      </span> <span onClick={() => deleteCity(cityId)}><CloseIcon/></span>
    </Button>
)};

export default connect(
  null,
  { toggleCityMonitoring, remCityFromMonitoring }
)(City);