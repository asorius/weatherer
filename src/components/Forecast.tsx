import React from 'react';
import { Ctx } from '../context';
export default function Forecast() {
  const context = React.useContext(Ctx);
  console.log(context?.state.data);
  return <div>This is for forecast</div>;
}
