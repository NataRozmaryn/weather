import types from './weather_types';

const initialState = {
};
export default function weatherDetail(state = initialState, action) {
    console.log(state, action);
    switch (action.type) {
        case types.WEATHER_DETAIL_REQUEST: {
            return {
                ...state,
                [action.payload.cityID]: {
                    isLoading: true,
                    weatherData: null
                }
            }
        }
        case types.WEATHER_DETAIL_FAILURE: {
            return {
                ...state,
                isLoading: false
            }
        }
        case types.WEATHER_DETAIL_SUCCESS: {
            return {
                ...state,
                [action.payload.cityID]: {
                    isLoading: false,
                    weatherData: action.payload.data.hourly
                        .map((el) => ({
                            dt: el.dt,
                            icon: el.weather[0].icon,
                            feels_like: el.feels_like,
                            temp: el.temp,
                            main: el.weather[0].main,
                            wind_speed: el.wind_speed
                        }))
                }
            }
        }
        default:
            return state;

    }
}