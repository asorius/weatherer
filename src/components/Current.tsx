import { useContext } from 'react';
import { Ctx } from '../context';
export default function Current() {
  const context = useContext(Ctx);
  const data = context?.state.data?.current;
  const name = data?.name,
    temp = data?.main.temp,
    weather = data?.weather[0].description,
    country = data?.sys.country;
  console.log(data);
  const loading = context?.state.loading ? <div>Loading...</div> : null;

  return (
    <div className=''>
      <div className=''>
        <h4>
          Current Weather in {name},{country}.
        </h4>
        <div className=''>
          <h5>
            {weather} with temperature of {Math.round(temp)} &#8451;.
          </h5>
        </div>
      </div>
    </div>
  );
}
