import React, { useState } from 'react';
import axios from 'axios';

import WeatherInput from './components/weatherInput/WeatherInput';
import FullData from './components/fullData/FullData';
import FutureData from './components/futureData/FutureData';

import './App.css';

const App = () => {
  const [ futureWeather, setFutureWeather ] = useState(null);
  const [ currentWeather, setCurrentWeather ] = useState(null);
  const [ currentId, setCurrentId ] = useState(0);

  const getWeather = city => {
    axios.get( `/search/?query=${city}` )
      .then( location => {
        axios.get(`${location.data[0].woeid}`)
          .then( weather => {
            console.log( weather );
            makeForecastArray( weather );
          })
      }) .catch( error => {
        console.log(error)
      })
  }

  const makeForecastArray = response => {
    let futureWeather = [];
    for ( let i = 0; i < 5; i++ ) {
      futureWeather[i] = <FutureData 
        key={i}
        onClick={() => getFullData(i)} 
        data={response.data.consolidated_weather[i]}
        />
    }
    setFutureWeather( futureWeather );
    setCurrentWeather( <FullData data={response.data}
      current={currentId}/> );
  }

  const getFullData = index => {

  }

  return (
    <>
      <WeatherInput handleSubmit={getWeather}/>
      {currentWeather}
      {futureWeather}
    </>
  );
}

export default App;
