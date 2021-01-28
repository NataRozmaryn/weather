import { ADD_CITY, TOGGLE_CITY, SET_FILTER} from "./actionTypes";
import axios from 'axios';
import { WEATHER_ACTIONS } from "../constants";

const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'c3eca2d6ad989bd903eb2be8789fb9b2';

let nextCityId = 0;

export const addCity = content => ({
  type: ADD_CITY,
  payload: {
    id: ++nextCityId,
    content
  }
});

export const toggleCity = id => ({
  type: TOGGLE_CITY,
  payload: { id }
});

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });

export const getWeatherByCityAction = (city) => (dispatch, state) => {
  dispatch ({type: WEATHER_ACTIONS.WEATHER_REQUESTED});
  axios.get(`${BASE_URL}?q=${city.content}&appid=${API_KEY}`)
    .then((res) => {
      dispatch({type: WEATHER_ACTIONS.WEATHER_RECEIVED, payload: {city: city, weather: res.data}});
    }).catch((error) => { console.log(error); });
}
