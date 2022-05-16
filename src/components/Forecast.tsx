import React from 'react';
import { Ctx } from '../context';
interface WeatherData {
  main: string;
  description: string;
  icon: string;
  temp: number;
}
interface DayWeatherData {
  date: { year: number; month: number; day: number };
  data: {
    time: string;
    weather: WeatherData;
  }[];
}
export default function Forecast() {
  const context = React.useContext(Ctx);
  const data = React.useMemo(
    () => context?.state.data?.forecast.list || [],
    [context?.state.data?.forecast.list]
  );
  const [daysWithTemps, setDays] = React.useState<DayWeatherData[]>([]);
  const normalizedDate = (timestamp: number) => {
    const dt = timestamp;
    const year = new Date(dt).getFullYear();
    const month = new Date(dt).getMonth() + 1;
    const day = new Date(dt).getUTCDate();
    return { year, month, day };
  };
  React.useEffect(() => {
    let list: typeof daysWithTemps = [];

    data.forEach((el: any, i: number) => {
      if (i + 1 < data.length) {
        const date = normalizedDate(el.dt * 1000);
        const time = el.dt_txt.split(' ')[1];
        const weather: WeatherData = {
          main: el.weather[0].main,
          description: el.weather[0].description,
          icon: el.weather[0].icon,
          temp: Math.round(el.main.temp),
        };
        const dayInList = list.find(
          (dayObj: any) => date.day === dayObj.date.day
        );
        if (dayInList) {
          dayInList.data.push({ time, weather });
        } else {
          list.push({
            date,
            data: [],
          });
        }
      }
    });
    console.log(list);
    setDays(list);
  }, [data]);
  return data ? (
    <div>
      {daysWithTemps.map((el: DayWeatherData, i: number) => (
        <div
          key={i}
          // className='-translate-x-[60%] translate-y-[50px] scale-x-[0.86] scale-y-1 skew-x-0 skew-y-[8deg] translate-z-0 text-black'>
          className=' text-black'>
          {el.date.year} {el.date.month} {el.date.day}
          <br />
          {el.data[0].weather.temp}
          <img
            src={
              'https://openweathermap.org/img/w/' +
              el.data[0].weather.icon +
              '.png'
            }
            alt='icon'
          />
          {el.data[0].weather.description}
        </div>
      ))}
    </div>
  ) : null;
}
