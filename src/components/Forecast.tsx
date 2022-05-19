import React from 'react';
import { Ctx } from '../context';
interface WeatherData {
  main: string;
  description: string;
  icon: string;
  temp: number;
}
interface DayWeatherData {
  date: string;
  data: {
    time: string;
    weather: WeatherData;
  }[];
}
export default function Forecast() {
  const context = React.useContext(Ctx);
  const parent = React.createRef<HTMLDivElement>();
  const dataFromContext = React.useMemo(
    () => context?.state.data?.forecast.list || [],
    [context?.state.data?.forecast.list]
  );
  const [daysWithTemps, setDays] = React.useState<DayWeatherData[]>([]);

  React.useEffect(() => {
    let list: typeof daysWithTemps = [];
    dataFromContext.forEach((el: any, i: number) => {
      if (i + 1 < dataFromContext.length) {
        const [date, time] = el.dt_txt.split(' ');
        const weather: WeatherData = {
          main: el.weather[0].main,
          description: el.weather[0].description,
          icon: el.weather[0].icon,
          temp: Math.round(el.main.temp),
        };

        const dayInList = list.find((dayObj: any) => {
          return date === dayObj.date;
        });
        if (dayInList) {
          dayInList.data.push({ time, weather });
        } else {
          list.push({
            date,
            data: [{ time, weather }],
          });
        }
      }
    });
    setDays(list);
  }, [dataFromContext]);
  const [x, y] = [50, 50];
  return (
    <div
      className='grid grid-cols-1 grid-flow-row w-full place-items-center relative'
      ref={parent}>
      {dataFromContext && (
        <>
          {daysWithTemps.map((dayObject: DayWeatherData, i: number, array) => {
            const [year, month, day] = dayObject.date.split(':');
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
                  {dayObject.data.map((el, index, arr) => {
                    const total = arr.length;
                    const isLast = index + 1 === total;
                    const temp = el.weather.temp;
                    const divStep = y / total;
                    // console.log({ NEXT: array[i + 1].data[0].weather.temp });
                    // ADD
                    const x1 = x / 2 + temp,
                      y1 = index === 0 ? 0 : (index + 1) * divStep,
                      x2 =
                        x / 2 +
                        (index + 1 < total ? arr[index + 1].weather.temp : 0),
                      y2 = (2 + index) * divStep;
                    return (
                      <>
                        <line
                          key={index}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke='red'
                        />

                        <text
                          x={index % 2 ? x1 + 5 : x1 - 40}
                          y={index === 0 ? y1 + 5 : isLast ? y1 - 2 : y1}
                          className={'text-[.3rem]'}
                          key={index + 20}>
                          {el.weather.temp}&#8451; at {el.time.substring(-4)}
                        </text>
                        {isLast && (
                          <line
                            key={index + 40}
                            x1={x2}
                            y1={y2}
                            x2={
                              25 +
                              (i + 1 < array.length
                                ? array[i + 1].data[0].weather.temp / 2
                                : 0)
                            }
                            y2={y2}
                            stroke='red'
                          />
                        )}
                      </>
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
