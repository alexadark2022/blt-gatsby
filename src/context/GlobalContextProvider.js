// @ts-nocheck
import React, { createContext, useReducer } from "react";

export const GlobalStateContext = createContext();
export const GlobalDispatchContext = createContext();

const initialState = {
  bucketListId: undefined,
  items: [],
  isMapOpen: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_BL_ID": {
      return {
        ...state,
        bucketListId: action.bucketListId,
      };
    }
    case "SET_BL_ITEMS": {
      return {
        ...state,
        items: action.items,
      };
    }
    case "SET_MAP_OPEN": {
      return {
        ...state,
        isMapOpen: true,
      };
    }
    case "TOGGLE_MAP_OPEN": {
      return {
        ...state,
        isMapOpen: !state.isMapOpen,
      };
    }
    case "SET_MAP_CLOSE": {
      return {
        ...state,
        isMapOpen: false,
      };
    }
    default:
      throw new Error("Bad action type");
  }
}

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export default GlobalContextProvider;
