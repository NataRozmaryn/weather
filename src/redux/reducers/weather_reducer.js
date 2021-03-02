import types from './weather_types';
import citiesTypes from './cities_types';

const initialState = {};
export default function weather(state = initialState, action) {
    console.log(state, action);
    switch (action.type) {
        case types.WEATHER_CITY_REQUEST: {
            return {
                ...state,
                [action.payload.cityID]: {
                    ...state[action.payload.cityID],
                    isLoading: true,
                }
            }
        }
        case types.WEATHER_CITY_FAILURE: {
            return {
                ...state,
                [action.payload.cityID]: {
                    ...state[action.payload.cityID],
                    isLoading: false,
                    error: action.payload.error,
                },
            }
        }
        case types.WEATHER_CITY_SUCCESS: {
            return {
                ...state,
                [action.payload.cityID]: {
                    isLoading: false,
                    timezone: action.payload.data.timezone,
                    temp: action.payload.data.main.temp,
                    icon: action.payload.data.weather[0].icon,
                    description: action.payload.data.weather[0].description,
                    windSpeed: action.payload.data.wind.speed
                }
            }
        }
        case citiesTypes.SEARCH_CITY_SUCCESS:
            return {
                ...state,
                [action.payload.data.id]: {
                    isLoading: false,
                    timezone: action.payload.data.timezone,
                    temp: action.payload.data.main.temp,
                    icon: action.payload.data.weather[0].icon,
                    description: action.payload.data.weather[0].description,
                    windSpeed: action.payload.data.wind.speed
                }
            }
        default:
            return state;

    }
}