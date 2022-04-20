import React, { createContext } from 'React';

const state = { location: '', loading: false, data: [] };
const Ctx = createContext(state);
// const reducerFn = (state, action) => {
//   switch (action.type) {
//     case 'loading': {
//       return { ...state, loading: true };
//     }
//     default: {
//       return state;
//     }
//   }
// };

const WithContext: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Ctx.Provider value={state}>{children}</Ctx.Provider>;
};
export { WithContext, Ctx };
