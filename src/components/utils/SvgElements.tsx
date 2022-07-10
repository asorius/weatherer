interface Props {
  x: number;
  y: number;
  x2?: number;
  y2?: number;
  temp?: number;
  time?: string;
  description?: string;
  icon?: string;
  title?: string;
  color?: boolean;
}
const TemperatureLabel = ({ x, y, temp, description, icon }: Props) => {
  return (
    <>
      <text x={x - 3} y={y - 5} className={'text-[.6rem]'}>
        {temp}&#176;
      </text>
      <circle cx={x} cy={y} r={1.5} className='m-4 hover:stroke-red-500'>
        <title>{description}</title>
      </circle>
      <image
        x={x - 5}
        y={y}
        width={15}
        height={15}
        href={'https://openweathermap.org/img/w/' + icon + '.png'}>
        <title>{description}</title>
      </image>
    </>
  );
};
const MainLine = ({ x, y, x2, y2, title, color }: Props) => {
  return (
    <line
      x1={x}
      y1={y}
      x2={x2}
      y2={y2}
      className={`${
        color ? 'stroke-gray-400/25' : 'stroke-mainOrange'
      } stroke-[.5]`}>
      <title>{title}</title>
    </line>
  );
};
const TimeLabel = ({ x, y, time }: Props) => {
  return (
    <text x={x - 5} y={y - 3} className={'text-[.4rem]'}>
      {time}
    </text>
  );
};
const TimeAxis = ({ x, y, x2, y2, title }: Props) => {
  return (
    <line
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
