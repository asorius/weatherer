import React from 'react';

interface PropTypes {
  city: string;
  actionFn: (e: React.SyntheticEvent<HTMLOptionElement>) => void;
  isSelected: boolean;
}
export default function Option({
  city,
  actionFn,
  isSelected = false,
}: PropTypes) {
  return (
    <li
      tabIndex={0}
      value={city}
      onClick={(e: React.SyntheticEvent<HTMLOptionElement>) => actionFn(e)}
      role='presentation'
      className={`p-2 cursor-pointer hover:text-mainBlue hover:bg-white/25 ${
        isSelected && 'text-mainBlue bg-white/25'
      }`}>
      <div role='option' aria-selected={isSelected}>
        {city}
      </div>
    </li>
  );
}
