import types from './cities_types';

const initialState = {
};

export default function cities(state = initialState, action) {
    console.log(state, action);
    switch (action.type) {

        case types.SEARCH_CITY_REQUEST:
            console.log("weather for the city requested");
            return state

        case types.SEARCH_CITY_SUCCESS:
            console.log("weather for the city received");
            console.log(state);
            return {
                ...state,
                [action.payload.data.id]: {
                    id: action.payload.data.id,
                    enabled: true,
                    name: action.payload.data.name,
                    coord: action.payload.data.coord
                }
            }
        case types.SEARCH_CITY_FAILURE:
            console.log("weather for the city failed to receive");
            return state


        // case types.ADD_CITY:
        //     console.log("adding city");
        //     return {
        //         [action.payload.data.id]: {
        //             id: action.payload.data.id,
        //             enabled: true,
        //             name: action.payload.data.name
        //         }
        //     }

        case types.TOGGLE_CITY: {
            const { id } = action.payload;
            return {
                ...state,
                [id]: {
                    ...state[id],
                    enabled: !state[id].enabled
                }
            }
        }
        case types.REMOVE_CITY: {
            const { id } = action.payload;
            let res = { ...state };
            delete res[id];
            return res;
        }
        default:
            return state;
    }
}