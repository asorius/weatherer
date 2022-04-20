import React from 'react';
import Form from './components/Form';
import Header from './components/Header';

function App() {
  console.log(process.env.REACT_APP_WEATHER_KEY);

  return (
    <div className='bg-hero-svg h-screen w-screen bg-no-repeat bg-cover bg-center font-poppins'>
      <div className='container mx-auto '>
        <Header />
        <Form />
      </div>
    </div>
  );
}

export default App;
