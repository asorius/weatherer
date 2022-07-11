import React from 'react';
import Current from './components/Current';
import Forecast from './components/Forecast';
import Form from './components/Form';
import Header from './components/Header';
import SlidingAnimationController from './components/SlidingAnimationController';

import { WithContext } from './context';
function App() {
  const [toTop, showToTop] = React.useState(false);
  React.useEffect(() => {
    const scrollHandler = () => {
      const height = document.body.scrollHeight;
      const scrolled = window.scrollY;
      if (height / scrolled < 5) {
        showToTop(true);
      } else {
        showToTop(false);
      }
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);
  return (
    <WithContext>
      <div
        className='bg-hero-svg min-h-screen bg-no-repeat bg-cover bg-center font-poppins bg-fixed h-full'
        id='main'>
        <div className='flex flex-col h-full px-3 max-w-screen-2xl lg:mx-auto'>
          <SlidingAnimationController>
            <Header />
            <Form />
          </SlidingAnimationController>
          <SlidingAnimationController body={true}>
            <Current />
            <Forecast />
          </SlidingAnimationController>
        </div>
        <div
          className={`duration-300 ${
            toTop ? 'opacity-100' : 'opacity-0'
          } sticky bottom-[3%] left-[85%] bg-neutral-800/25 h-10 w-10 grid content-center z-[200] rounded-full`}>
          <a href='#main'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 mx-auto stroke-white'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M5 10l7-7m0 0l7 7m-7-7v18'
              />
            </svg>
          </a>
        </div>
      </div>
    </WithContext>
  );
}

export default App;
