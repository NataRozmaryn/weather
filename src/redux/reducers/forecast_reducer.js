import types from './weather_types';

const initialState = {};
export default function forecast(state = initialState, action) {
    console.log(state, action);
    switch (action.type) {
        case types.FORECAST_REQUEST: {
            return {
                ...state,
                [action.payload.cityID]: {
                    isLoading: true,
                    weatherData: null
                }
            }
        }
        case types.FORECAST_FAILURE: {
            return {
                ...state,
                isLoading: false
            }
        }
        case types.FORECAST_SUCCESS: {
            return {
                ...state,
                [action.payload.cityID]: {
                    isLoading: false,
                    weatherData: action.payload.data.daily
                }
            }
        }
        default:
            return state;

    }
}