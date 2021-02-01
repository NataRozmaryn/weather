import { ADD_CITY, TOGGLE_CITY, DELETE_CITY } from "../actionTypes";

const initialState = {
  allIds: [],
  byIds: {}
};

export default function cities(state = initialState, action) {
  console.log("cities reducer ", state, action);
  switch (action.type) {
    case ADD_CITY: {
      const { id, content } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            content,
            selected: true
          }
        }
      };
    }
    case TOGGLE_CITY: {
      const { id } = action.payload;
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            ...state.byIds[id],
            selected: !state.byIds[id].selected
          }
        }
      };
    }
    case DELETE_CITY: {
      const { id } = action.payload;
      let newByIds = {...state.byIds};
      delete newByIds[id];
      return {...state,
        byIds: newByIds,
        allIds: state.allIds.filter(item => item!==id)
      };
    }
    default:
      return state;
  }
}