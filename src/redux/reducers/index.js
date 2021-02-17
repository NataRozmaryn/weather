import { combineReducers } from "redux";
import cities from "./cities_reducer";
import weather from "./weather_reducer";
import forecast from "./forecast_reducer";
import weatherDetail from "./weatherDetail_reducer"
export default combineReducers({ cities, weather, weatherDetail, forecast });