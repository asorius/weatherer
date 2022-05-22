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
  const [x, y] = [100, 100];
  return (
    <div
      className='grid grid-rows-1 grid-flow-col w-full place-items-center relative'
      ref={parent}>
      {dataFromContext && (
        <>
          {daysWithTemps.map(
            (dayObject: DayWeatherData, dayIndex: number, daysArray) => {
              const [year, month, day] = dayObject.date.split(':');
              return (
                <div
                  key={dayIndex}
                  className='h-[20rem] w-full border-2 border-cyan-500 relative'>
                  {year} {month} {day}
                  <br />
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox={`0 0 ${x} ${y}`}
                    className='absolute top-0 left-0 h-full w-full'>
                    <line
                      key={dayIndex + 60}
                      x1={0}
                      x2={x}
                      y1={y / 2}
                      y2={y / 2}
                      stroke='grey'
                    />

                    <text
                      x={0}
                      y={y / 2 + 5}
                      className={'text-[.3rem]'}
                      key={88}>
                      0
                    </text>
                    {dayObject.data.map((dayElement, timeIndex, timesArray) => {
                      const total = timesArray.length;
                      const isLastTime = timeIndex + 1 === total;
                      const isFirstTime = timeIndex === 0;
                      const isLastDay = dayIndex === daysArray.length - 1;
                      const temp = dayElement.weather.temp;
                      const time = dayElement.time;
                      const divStep = x / (total + 1);

                      const y1 = y / 2 - temp,
                        x1 =
                          timeIndex === 0
                            ? divStep / 2
                            : timeIndex * divStep + divStep / 2,
                        y2 =
                          y / 2 -
                          (timeIndex + 1 < total
                            ? timesArray[timeIndex + 1].weather.temp
                            : dayIndex + 1 < daysArray.length
                            ? daysArray[dayIndex + 1].data.slice(-1)[0].weather
                                .temp
                            : y1),
                        x2 =
                          timeIndex === 0
                            ? divStep + divStep / 2
                            : (timeIndex + 1) * divStep + divStep / 2;
                      const lastPreviousDayTemp = () => {
                        if (dayIndex - 1 >= 0) {
                          const temp =
                            daysArray[dayIndex - 1].data.slice(-1)[0].weather
                              .temp;

                          return temp;
                        } else if (timeIndex - 1 >= 0) {
                          return timesArray[timeIndex - 1].weather.temp;
                        } else {
                          return y1 - 25;
                        }
                      };

                      const firstNextDayTemp = () => {
                        if (timeIndex + 1 < total) {
                          return timesArray[timeIndex + 1].weather.temp;
                        } else if (dayIndex + 1 < daysArray.length) {
                          return daysArray[dayIndex + 1].data[0].weather.temp;
                        } else {
                          return y1 - 25;
                        }
                      };

                      const tempDiff = (t1: number, t2: number) => {
                        const diff = (t1 - t2) / 2;
                        return diff;
                      };
                      return (
                        <>
                          {isFirstTime && (
                            <>
                              <line
                                key={timeIndex + 60}
                                x1={0}
                                y1={
                                  y / 2 -
                                  (temp + tempDiff(lastPreviousDayTemp(), temp))
                                }
                                x2={divStep / 2}
                                y2={y1}
                                stroke='blue'
                              />
                            </>
                          )}
                          <line
                            key={timeIndex}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke='red'
                          />
                          <line
                            key={timeIndex + 200}
                            x1={x1}
                            y1={0}
                            x2={x1}
                            y2={y}
                            stroke='green'
                          />
                          <text
                            x={x1 - 5}
                            y={y}
                            className={'text-[.2rem]'}
                            transform={`rotate( ${x1 - 5} ${y} 90)`}>
                            {time}
                          </text>{' '}
                          <text
                            x={x1}
                            y={y1 - 5}
                            className={'text-[.3rem]'}
                            key={timeIndex + 20}>
                            {dayElement.weather.temp}&#8451;
                            {/* {dayElement.time.substring(-4)} */}
                          </text>
                          {!isLastDay && isLastTime && (
                            <>
                              <line
                                key={timeIndex + 50}
                                x1={x2}
                                y1={y2}
                                x2={x2 + divStep / 2}
                                y2={
                                  y / 2 -
                                  (temp + tempDiff(firstNextDayTemp(), temp))
                                }
                                stroke='black'
                              />
                              <line
                                key={timeIndex + 200}
                                x1={x2}
                                y1={0}
                                x2={x2}
                                y2={y}
                                stroke='green'
                              />
                              <text
                                x={x2 - 5}
                                y={y}
                                className={'text-[.3rem]'}
                                transform={`rotate( ${x} ${y} 90)`}>
                                {time}
                              </text>{' '}
                              */
                            </>
                          )}
                        </>
                      );
                    })}
                  </svg>
                </div>
              );
            }
          )}
        </>
      )}
    </div>
  );
}
