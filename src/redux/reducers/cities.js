import { ADD_CITY, TOGGLE_CITY } from "../actionTypes";

const initialState = {
  allIds: [],
  byIds: {}
};

export default function(state = initialState, action) {
  console.log(state, action);
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
    default:
      return state;
  }
}