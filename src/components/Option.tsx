import React from 'react';

export default function Option({
  city,
  actionFn,
}: {
  city: string;
  actionFn: (e: React.SyntheticEvent<HTMLOptionElement>) => void;
}) {
  return (
    <option
      tabIndex={1}
      value={city}
      onClick={(e: React.SyntheticEvent<HTMLOptionElement>) => actionFn(e)}
      className='p-2 cursor-pointer hover:text-mainBlue'>
      {city}
    </option>
  );
}
