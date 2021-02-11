import types from './weather_types';
import { getWeatherDetailData } from '../../services/WeatherServices';

export const detailWeatherRequest = res => ({
    type: types.WEATHER_DETAIL_REQUEST,
    payload: res
});
export const detailWeatherSuccess = res => ({
    type: types.WEATHER_DETAIL_SUCCESS,
    payload: res
});
export const detailWeatherFailure = e => ({
    type: types.WEATHER_DETAIL_FAILURE,
    payload: e
});
export const getDetailWeather = async (dispatch, coord) => {
    debugger;
    dispatch(detailWeatherRequest(coord));

    try {
        const response = await getWeatherDetailData(coord.lat, coord.lon);
        dispatch(detailWeatherSuccess({ cityID: coord.cityID, data: response.data }));
    } catch (e) {
        dispatch(detailWeatherFailure(e));
    }
};