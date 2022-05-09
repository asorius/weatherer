import { useContext } from 'react';
import { Ctx } from '../context';
import Card from './Card';
export default function Current() {
  const context = useContext(Ctx);
  const data = context?.state.data?.current;
  const name = data?.name,
    temp = data?.main.temp,
    weatherDescription = data?.weather[0].description,
    country = data?.sys.country,
    icon = data?.weather[0].icon;
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
        <Card
          city={name}
          country={country}
          imgUrl={url}
          temp={temp}
          weatherDescription={weatherDescription}
          label={'Current Weather in'}
        />
      )}
    </div>
  );
}
