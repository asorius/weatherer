import React, { useContext } from 'react';
import { Ctx } from '../context';
export default function Current() {
  const context = useContext(Ctx);
  const data = context?.state.data;
  // const name = data?.name,
  //   temp = data?.main.temp,
  //   weather = data?.weather[0].description,
  //   country = data?.sys.country;
  console.log(data);
  return (
    <div className='row'>
      <div className='data_container container'>
        <h4>
          {/* Current Weather in {name},{country}. */}
          olljsdf
        </h4>
        <div className='details'>
          <h5>
            {/* {weather} with temperature of {Math.round(temp)} &#8451;. */}
          </h5>
        </div>
      </div>
    </div>
  );
}
