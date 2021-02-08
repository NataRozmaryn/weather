import React, { useState } from "react";
import { connect } from "react-redux";
import { getCity } from "../../redux/reducers/cities_actions";

const AddCity = ({ searchCity }) => {
  const [input, setInput] = useState("");

  const updateInput = input => {
    setInput(input);
  };

  const handleAddCity = () => {
    searchCity(input);
    setInput("");
  };


  return (
    <div className="search-bar">
      <input
        type="search"
        onChange={e => updateInput(e.target.value)}
        value={input}
        className="search-bar__input"
        placeholder="Search for a city"
      />
      <button
        type="submit"
        className="search-bar__control"
        onClick={handleAddCity}>
        Search
        </button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchCity: (cityName) => getCity(dispatch, cityName)
  }
}
export default connect(
  null,
  mapDispatchToProps
)(AddCity);