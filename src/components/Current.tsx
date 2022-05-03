import { useContext } from 'react';
import { Ctx } from '../context';
export default function Current() {
  const context = useContext(Ctx);
  const data = context?.state.data?.current;
  const name = data?.name,
    temp = data?.main.temp,
    weatherDescription = data?.weather[0].description,
    country = data?.sys.country,
    icon = data?.weather[0].icon;
  console.log(data);
  const loading = (
    <div className='flex items-center justify-center '>
      <div className='w-24 h-24 border-l-2  rounded-full animate-spin border-mainBlue'></div>
    </div>
  );

  let url = 'https://openweathermap.org/img/w/' + icon + '.png';
  return (
    <div className='flex justify-center'>
      {context?.state.loading && loading}

      {!context?.state.loading && name && (
        <div className='block rounded-lg shadow-lg bg-white/80 max-w-sm text-center'>
          <div className='py-3 px-6 border-b border-gray-300 bg-mainOrange'>
            Current Weather in
          </div>
          <div className='py-3 px-6'>
            <h5 className='text-gray-900 text-2xl font-medium mb-2'>
              {name},{country}
            </h5>
            <p className='text-gray-700 text-xl mb-4'>
              {Math.round(temp)} &#8451;
            </p>
            <img
              className=' inline-block h-20  transition duration-150 ease-in-out'
              src={url}
              alt='Weather icon'
            />
          </div>
          <div className='py-3 px-6 border-t border-gray-300 text-gray-600 bg-mainOrange'>
            {weatherDescription}
          </div>
        </div>
      )}
    </div>
  );
}
