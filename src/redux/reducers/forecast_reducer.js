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
            console.log("forecast reducer", action.payload.data.daily);
            return {
                ...state,
                [action.payload.cityID]: {
                    isLoading: false,
                    weatherData: action.payload.data.daily
                        .map((el) => ({
                            dt: el.dt,
                            icon: el.weather[0].icon,
                            feels_like: {
                                day: el.feels_like.day,
                                night: el.feels_like.night,
                                eve: el.feels_like.eve,
                                morn: el.feels_like.morn,
                            },
                            temp: {
                                day: el.temp.day,
                                eve: el.temp.eve,
                                max: el.temp.max,
                                min: el.temp.min,
                                morn: el.temp.morn,
                                night: el.temp.night
                            },
                            description: el.weather[0].description,
                            wind_speed: el.wind_speed,
                            sunrise: el.sunrise,
                            sunset: el.sunset
                        }))
                }
            }
        }
        default:
            return state;

    }
}