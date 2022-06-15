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

  let url = 'https://openweathermap.org/img/w/' + icon + '.png';
  return (
    <div className='flex justify-center'>
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
