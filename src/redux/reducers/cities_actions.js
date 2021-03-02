import types from './cities_types';
import { getWeatherData } from '../../services/WeatherServices';

export const addCityToMonitoring = id => ({
    type: types.ADD_CITY,
    payload:
        id

});
export const remCityFromMonitoring = id => ({
    type: types.REMOVE_CITY,
    payload: {
        id
    }
});

export const toggleCityMonitoring = id => ({
    type: types.TOGGLE_CITY,
    payload: {
        id
    }
});

export const getCity = async (dispatch, city) => {
    dispatch({ type: types.SEARCH_CITY_REQUEST });

    try {
        const response = await getWeatherData(city);

        dispatch({ type: types.SEARCH_CITY_SUCCESS, payload: response });
    } catch (e) {

        dispatch({ type: types.SEARCH_CITY_FAILURE, payload: e });
    }
};