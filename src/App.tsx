import React from 'react';
import Current from './components/Current';
import Forecast from './components/Forecast';
import Form from './components/Form';
import Header from './components/Header';
import SlidingAnimationController from './components/SlidingAnimationController';

import { WithContext } from './context';
function App() {
  return (
    <WithContext>
      <div className='bg-hero-svg min-h-screen bg-no-repeat bg-cover bg-center font-poppins bg-fixed'>
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
      </div>
    </WithContext>
  );
}

export default App;
