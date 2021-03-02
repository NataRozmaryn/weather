import types from './weather_types';
import { getWeatherDetailData } from '../../services/WeatherServices';

export const forecastRequest = res => ({
    type: types.FORECAST_REQUEST,
    payload: res
});
export const forecastSuccess = res => ({
    type: types.FORECAST_SUCCESS,
    payload: res
});
export const forecastFailure = e => ({
    type: types.FORECAST_FAILURE,
    payload: e
});
export const getForecast = async (dispatch, coord) => {

    dispatch(forecastRequest(coord));

    try {
        const response = await getWeatherDetailData(coord.lat, coord.lon);
        dispatch(forecastSuccess({ cityID: coord.cityID, data: response.data }));
    } catch (e) {
        dispatch(forecastFailure(e));
    }
};