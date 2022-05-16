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
  const parent = React.createRef<HTMLDivElement>();
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
  const [x, y] = [50, 50];
  return (
    <div
      className='grid grid-cols-1 grid-flow-row w-full place-items-center relative'
      ref={parent}>
      {data && (
        <>
          {daysWithTemps.map((dayObject: DayWeatherData, i: number) => {
            const { year, month, day } = dayObject.date;

            return (
              <div
                key={i}
                className='h-64 w-full border-2 border-cyan-500 relative'>
                {year} {month} {day}
                <br />
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox={`0 0 ${+x} ${+y}`}
                  className='absolute top-0 left-0 h-full w-full'>
                  {dayObject.data.map((el, ii, arr) => {
                    const total = arr.length;
                    const index = ii + 1;
                    const temp = el.weather.temp;
                    const divStep = y / total;
                    // COORDINATES
                    const x1 = `${x / 2 + (index === 1 ? 0 : temp)}`,
                      y1 = `${index === 1 ? 0 : index * divStep}`,
                      x2 = `${
                        x / 2 +
                        (index === 1
                          ? temp
                          : index < total
                          ? arr[index].weather.temp
                          : 0)
                      }`,
                      y2 = `${1 + index * divStep}`;

                    console.log({ x1, y1, x2, y2 });
                    return (
                      <line
                        key={index}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke='red'
                      />
                    );
                  })}
                </svg>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
