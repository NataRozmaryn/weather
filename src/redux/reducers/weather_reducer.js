import types from './weather_types';

const initialState = {
    weatherData: null,
    cityID: null,
    isLoading: false,
    error: null
};
export default function weather(state = initialState, action) {
    console.log(state, action);
    switch (action.type) {
        case types.WEATHER_CITY_REQUEST: {
            return {
                ...state,
                [action.payload.cityID]: {
                    isLoading: true,
                    weatherData: null
                }
            }
        }
        case types.WEATHER_CITY_FAILURE: {
            return {
                ...state,
                isLoading: false
            }
        }
        case types.WEATHER_CITY_SUCCESS: {
            return {
                ...state,
                [action.payload.cityID]: {
                    isLoading: false,
                    weatherData: action.payload.data
                }
            }
        }
        default:
            return state;

    }
}