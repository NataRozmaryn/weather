import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import cities from "./cities";
import weather from "./weather";

export default combineReducers({ cities, visibilityFilter, weather });