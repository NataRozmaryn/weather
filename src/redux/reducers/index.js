import { combineReducers } from "redux";
import cities_reducer from "./cities_reducer";
import weather_reducer from "./weather_reducer";

export default combineReducers({ cities_reducer, weather_reducer });