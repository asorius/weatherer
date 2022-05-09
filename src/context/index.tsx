import React, { createContext, Dispatch, useReducer } from 'react';

const initialState = {
  inputFocus: false,
  selectionValue: '',
  coords: [0, 0],
  location: '',
  loading: false,
  data: null,
};
interface State {
  inputFocus: boolean;
  selectionValue: string;
  coords: number[];
  location: string;
  loading: boolean;
  data?: any | null;
}
interface Action {
  type: string;
  payload?: {
    current?: any;
    forecast?: any;
    selectionValue?: string;
    coords?: number[];
  };
}
const Ctx = createContext<
  { state: State; dispatch: Dispatch<Action> } | undefined
>(undefined);

const reducerFn = (state: State, action: Action) => {
  switch (action.type) {
    case 'input-focus-change': {
      return { ...state, inputFocus: !state.inputFocus };
    }

    case 'target-selection': {
      console.log(action.payload);
      const value = action.payload?.selectionValue || '';
      const coords = action.payload?.coords || [0, 0];
      return { ...state, selectionValue: value, coords };
    }
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
