import React, { createContext, Dispatch, useReducer } from 'react';

const initialState = { location: '', loading: false, data: null };
interface State {
  location: string;
  loading: boolean;
  data?: any | null;
}
interface Action {
  type: string;
  payload: { target: string };
}
const Ctx = createContext<
  { state: State; dispatch: Dispatch<Action> } | undefined
>(undefined);
const weatherAPI = async (target: string, key: string | undefined) => {
  try {
    console.log('Getting data for : ' + target);
    const responseCurrent = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${target}&APPID=${key}&units=metric`
    );
    const responseForecast = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${target}&APPID=${key}&units=metric`
    );
    const current = await responseCurrent.json();
    const forecast = await responseForecast.json();
    return { current, forecast };
  } catch (e) {
    return { error: true };
  }
};
const reducerFn = (state: State, action: Action) => {
  switch (action.type) {
    case 'loading': {
      return { ...state, loading: true };
    }
    case 'get-weather': {
      const weatherKey = process.env.REACT_APP_WEATHER_KEY;
      const target = action.payload.target;
      const data = weatherAPI(target, weatherKey).then((data) => {
        console.log(data.current?.name);
        return data;
      });
      return { ...state, loading: false, data: data };
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
