import React from 'react';
import Current from './components/Current';
import Form from './components/Form';
import Header from './components/Header';
import { WithContext } from './context';
function App() {
  return (
    <WithContext>
      <div className='bg-hero-svg h-screen w-screen bg-no-repeat bg-cover bg-center font-poppins'>
        <div className='container mx-auto '>
          <Header />
          <Form />
          <Current />
        </div>
      </div>
    </WithContext>
  );
}

export default App;
