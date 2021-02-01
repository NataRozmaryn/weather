import { WEATHER_ACTIONS } from "../../constants";

const initialState = { 
    weatherRequested: false,
    cities: []
};
export default function weather (state = initialState, action)
{
    switch (action.type) {
        case WEATHER_ACTIONS.WEATHER_REQUESTED:
            return { ...state, weatherRequested: true }
        case WEATHER_ACTIONS.WEATHER_RECEIVED:
            let res = { ...state, weatherRequested: false };
            res.cities = [...res.cities];
            res.cities[action.payload.city.id] = action.payload.weather;
            return res;
        default:
            return state;
    }
}