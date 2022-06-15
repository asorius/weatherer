import React from 'react';
import { Ctx } from '../context';
import {
  MainLine,
  TemperatureLabel,
  TimeAxis,
  TimeLabel,
} from './utils/SvgElements';
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
  const [x, y] = [200, 100];
  const midY = 75;
  const lgStylesParent =
    ' lg:grid-flow-col lg:auto-cols-fr lg:divide-x-8 lg:divide-y-0 lg:w-max-7xl lg:h-full lg:pt-0';
  const lgStylesCard = 'lg:h-full ';
  return (
    <div
      className={`pt-20 grid grid-cols-1 grid-flow-row w-full place-items-center relative divide-y-4 ${lgStylesParent}`}
      ref={parent}>
      {dataFromContext && (
        <>
          {daysWithTemps.map(
            (dayObject: DayWeatherData, dayIndex: number, daysArray) => {
              const [year, month, day] = dayObject.date.split(':');
              const isLastDay = dayIndex + 1 === daysArray.length;
              if (isLastDay) {
                return null;
              }

              return (
                <div
                  id={'day-graph-card' + dayObject.date}
                  key={dayObject.date}
                  // FIRST ITEM SHRINKED AND HALF BEHIND
                  className={` h-[20rem] max-w-max relative text-center duration-300 hover:scale-105 lg:hover:scale-110 hover:z-20 flex flex-col justify-center bg-white/95 border-2 rounded-md  hover:border-slate-700/95   ${
                    dayIndex === 0 && 'border-l-mainOrange/95'
                  } ${lgStylesCard}`}>
                  <span className='block m-2 underline decoration-4 text-2xl pt-4'>
                    {year} {month} {day}
                  </span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox={`0 0 ${x} ${y}`}
                    className=' h-full w-full'>
                    {/* MAIN X AXIS  -----*/}
                    <line
                      key={dayIndex + 20}
                      x1={0}
                      x2={x}
                      y1={midY}
                      y2={midY}
                      className='stroke-[.5] stroke-mainBlue'
                    />
                    {dayIndex === 0 && (
                      <text
                        x={0}
                        y={midY + 5}
                        className={'text-[.4rem]'}
                        key={dayIndex + 300}>
                        0
                      </text>
                    )}
                    {/* ------------ */}
                    {dayObject.data.map((dayElement, timeIndex, timesArray) => {
                      const total = timesArray.length;

                      const isLastTime = timeIndex + 1 === total;
                      const isFirstTime = timeIndex === 0;
                      const isLastDay = dayIndex === daysArray.length - 1;
                      const temp = dayElement.weather.temp;
                      const nextTemp = () => {
                        if (timeIndex + 1 < total) {
                          const t = timesArray[timeIndex + 1].weather.temp;
                          return t;
                        } else if (dayIndex + 1 < daysArray.length) {
                          const t2 =
                            daysArray[dayIndex + 1].data[0].weather.temp;

                          return t2;
                        } else {
                          return temp;
                        }
                      };
                      const time = dayElement.time.slice(0, -3);
                      const divStep = x / (total + 1);
                      const y1 = midY - temp,
                        x1 =
                          timeIndex === 0
                            ? divStep / 2
                            : timeIndex * divStep + divStep / 2,
                        y2 = midY - nextTemp(),
                        x2 =
                          timeIndex === 0
                            ? divStep + divStep / 2
                            : (timeIndex + 1) * divStep + divStep / 2;
                      const lastPreviousDayTemp = () => {
                        if (dayIndex - 1 >= 0) {
                          const prevDayLastTemperature =
                            daysArray[dayIndex - 1].data.slice(-1)[0].weather
                              .temp;
                          return prevDayLastTemperature;
                        } else if (timeIndex - 1 > 0) {
                          const prevTimeTemperature =
                            timesArray[timeIndex - 1].weather.temp;
                          return prevTimeTemperature;
                        } else {
                          // if it's the first day and there's no previous temperature set to mid y value
                          return midY / 2;
                        }
                      };

                      const firstNextDayTemp = () => {
                        if (timeIndex + 1 < total) {
                          return timesArray[timeIndex + 1].weather.temp;
                        } else if (dayIndex + 1 < daysArray.length) {
                          return daysArray[dayIndex + 1].data[0].weather.temp;
                        } else {
                          return y1 - midY / 2;
                        }
                      };

                      const tempDiff = (t1: number, t2: number) => {
                        const diff = (t1 - t2) / 2;
                        return diff;
                      };
                      return (
                        <>
                          {/* FIRST CONNECTION LINE */}
                          {isFirstTime && (
                            <MainLine
                              key={'startline' + dayObject.date}
                              x={0}
                              y={
                                midY -
                                (temp + tempDiff(lastPreviousDayTemp(), temp))
                              }
                              x2={divStep / 2}
                              y2={y1}
                              title={'Temperature Graph'}
                              color={
                                dayIndex === 0 ? 'gray-400/25' : 'mainOrange'
                              }></MainLine>
                          )}
                          {/* ------------ */}
                          {/* MAIN GRAPH ELEMENTS*/}
                          <MainLine
                            key={'mainline' + dayObject.date}
                            x={x1}
                            y={y1}
                            x2={x2}
                            y2={y2}
                            title={'Temperature Graph'}
                          />
                          <TimeAxis
                            key={'timeaxis' + dayObject.date}
                            x={x1}
                            y={0}
                            x2={x1}
                            y2={y}
                            title={time}></TimeAxis>
                          <TimeLabel
                            x={x1}
                            y={y}
                            time={time}
                            key={'timelabel' + dayObject.date}></TimeLabel>

                          <TemperatureLabel
                            x={x1}
                            y={y1}
                            key={'templabel' + dayObject.date}
                            temp={temp}
                            description={dayElement.weather.description}
                            icon={dayElement.weather.icon}
                          />
                          {/* ---------------- */}
                          {/* LAST TIME INDEX*/}
                          {!isLastDay && isLastTime && (
                            <>
                              <MainLine
                                key={'endline' + dayObject.date}
                                x={x2}
                                y={y2}
                                x2={x2 + divStep / 2}
                                y2={
                                  midY -
                                  (temp + tempDiff(firstNextDayTemp(), temp))
                                }
                              />
                              <TemperatureLabel
                                x={x2}
                                y={y2}
                                key={'endtemplabel' + dayObject.date}
                                temp={nextTemp()}
                                description={dayElement.weather.description}
                                icon={dayElement.weather.icon}
                              />
                              <TimeAxis
                                key={'endtimeaxis' + dayObject.date}
                                x={x2}
                                y={0}
                                x2={x2}
                                y2={y}></TimeAxis>

                              <TimeLabel
                                x={x2}
                                y={y}
                                time={time}
                                key={
                                  'endtimelabel' + dayObject.date
                                }></TimeLabel>
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
