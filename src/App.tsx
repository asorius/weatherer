import React from 'react';
import Current from './components/Current';
import Forecast from './components/Forecast';
import Form from './components/Form';
import Header from './components/Header';

import { WithContext } from './context';
function App() {
  return (
    <WithContext>
      <div className='bg-hero-svg h-screen w-screen bg-no-repeat bg-cover bg-center font-poppins'>
        <div className='container mx-auto '>
          <div id='this-shrinks-up'>
            <Header />
            <Form />
          </div>
          <div id='this-grows-in'>
            <Current />
            <Forecast />
          </div>
        </div>
      </div>
    </WithContext>
  );
}

export default App;
