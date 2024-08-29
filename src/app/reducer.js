// store/reducer.js
export const initialState = {
    sharedState: null
  };
  
  export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_STATE':
        return {
          ...state,
          sharedState: action.payload
        };
      default:
        return state;
    }
  };
  