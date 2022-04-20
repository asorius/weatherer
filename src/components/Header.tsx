import React from 'react';

export default function Header() {
  return (
    <header className='h-96 w-full grid place-content-center'>
      <h1 className='text-7xl lg:text-8xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-orange-400 '>
        Weather Checker
      </h1>
    </header>
  );
}
