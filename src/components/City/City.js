import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { toggleCity } from "../../redux/actions";

const City = ({ city, toggleCity }) => (
  <li className="city-item" onClick={() => toggleCity(city.id)}>
    {/* {city && city.selected ? "👌" : "👋"}{" "} */}
    <span
      className={cx(
        "city-item__text",
        city && city.selected && "city-item__text--selected"
      )}
    >
       {city.content} 
    </span> 
  </li>
);

// export default CityList;
export default connect(
  null,
  { toggleCity }
)(City);