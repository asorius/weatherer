interface CardProps {
  city: string;
  country: string;
  temp: number;
  imgUrl: string;
  weatherDescription: string;
  label: string;
}
export default function Card({
  city,
  country,
  temp,
  imgUrl,
  weatherDescription,
  label,
}: CardProps) {
  return (
    <div className='block rounded-lg shadow-lg bg-white/90 max-w-sm text-center'>
      <div className='py-3 px-6 border-b border-gray-300 bg-mainOrange'>
        {label}
      </div>
      <div className='py-3 px-6'>
        <h5 className='text-gray-900 text-3xl font-medium mb-2'>
          {city}, <span className='text-xl'>{country}</span>
        </h5>
        <p className='text-gray-700 text-6xl m-4'>
          {Math.round(temp)} <span className='text-3xl'>&#8451;</span>
        </p>
        <img
          className=' inline-block h-20  transition duration-150 ease-in-out'
          src={imgUrl}
          alt='Weather icon'
        />
      </div>
      <div className='py-3 px-6 border-t border-gray-300 text-gray-600 bg-white/90'>
        {weatherDescription}
      </div>
    </div>
  );
}
