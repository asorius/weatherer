import React, { createContext, Dispatch, useReducer } from 'react';

const initialState = { location: '', loading: false, data: null };
interface State {
  location: string;
  loading: boolean;
  data?: any | null;
}
interface Action {
  type: string;
  payload?: { current: any; forecast: any };
}
const Ctx = createContext<
  { state: State; dispatch: Dispatch<Action> } | undefined
>(undefined);

const reducerFn = (state: State, action: Action) => {
  switch (action.type) {
    case 'loading': {
      return { ...state, loading: true };
    }
    case 'get-weather': {
      const data = action.payload;
      return { ...state, loading: false, data };
    }
    default: {
      return state;
    }
  }
};

const WithContext: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducerFn, initialState);
  const value = { state, dispatch };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};
export { WithContext, Ctx };
