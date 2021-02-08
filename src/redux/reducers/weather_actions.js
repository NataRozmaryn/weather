import types from './weather_types';
import { getWeatherData } from '../../services/WeatherServices';

export const weather_for_city_request = res => ({
    type: types.WEATHER_CITY_REQUEST,
    payload: res
});
export const weather_for_city_success = res => ({
    type: types.WEATHER_CITY_SUCCESS,
    payload: res
});
export const weather_for_city_failure = e => ({
    type: types.WEATHER_CITY_FAILURE,
    payload: e
});
export const getWeather = async (dispatch, city) => {
    dispatch(weather_for_city_request({ cityID: city.id }));

    try {
        const response = await getWeatherData(city.name);
        dispatch(weather_for_city_success({ cityID: city.id, data: response.data }));
    } catch (e) {
        dispatch(weather_for_city_failure(e));
    }
};