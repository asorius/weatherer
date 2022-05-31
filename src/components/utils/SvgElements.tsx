import React from 'react';
interface Props {
  x: number;
  y: number;
  x2?: number;
  y2?: number;
  key: number;
  temp?: number;
  time?: string;
  description?: string;
  icon?: string;
  title?: string;
  color?: string;
}
const TemperatureLabel = ({ x, y, key, temp, description, icon }: Props) => {
  return (
    <>
      <text x={x - 3} y={y - 5} className={'text-[.6rem]'} key={key}>
        {temp}&#8451;
      </text>
      <circle
        cx={x}
        cy={y}
        r={0.75}
        className='m-4 hover:stroke-red-500'
        key={key}>
        <title>{description}</title>
      </circle>
      <image
        x={x - 5}
        y={y}
        width={8}
        height={8}
        href={'https://openweathermap.org/img/w/' + icon + '.png'}>
        <title>{description}</title>
      </image>
    </>
  );
};
const MainLine = ({
  x,
  y,
  x2,
  y2,
  key,
  title,
  color = 'mainOrange',
}: Props) => {
  return (
    <line
      key={key}
      x1={x}
      y1={y}
      x2={x2}
      y2={y2}
      className={`stroke-[.5] stroke-${color}`}>
      <title>{title}</title>
    </line>
  );
};
const TimeLabel = ({ x, y, key, time }: Props) => {
  return (
    <text x={x - 5} y={y - 3} className={'text-[.4rem]'} key={key}>
      {time}
    </text>
  );
};
const TimeAxis = ({ x, y, x2, y2, key, title }: Props) => {
  return (
    <line
      key={key}
      x1={x}
      y1={y}
      x2={x2}
      y2={y2}
      className='stroke-[.5] stroke-gray-400/25'>
      <title>{title}</title>
    </line>
  );
};
export { TemperatureLabel, MainLine, TimeLabel, TimeAxis };
