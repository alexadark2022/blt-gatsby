// @ts-nocheck
import React, { createContext, useReducer } from "react";

export const GlobalStateContext = createContext();
export const GlobalDispatchContext = createContext();

const initialState = {
  bucketListId: undefined,
  items: [],
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
