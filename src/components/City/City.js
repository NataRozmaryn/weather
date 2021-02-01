import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { toggleCity, deleteCity } from "../../redux/actions";

const City = ({ city, toggleCity, deleteCity }) => (
  <li className="city-item" >
    <span onClick={() => toggleCity(city.id)}
      className={cx(
        "city-item__text",
        city && city.selected && "city-item__text--selected"
      )}
    >
       {city.content}
    </span> <span onClick={() => deleteCity(city.id)}>   x</span>
  </li>
);

// export default CityList;
export default connect(
  null,
  { toggleCity, deleteCity }
)(City);