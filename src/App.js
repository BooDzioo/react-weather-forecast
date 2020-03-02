import React, { useState, useEffect } from 'react';
import axios from 'axios';

import WeatherInput from './components/weatherInput/WeatherInput';
import FullData from './components/fullData/FullData';
import FutureData from './components/futureData/FutureData';

import './App.css';

const appID = 'c9695f512f49eff8710f793ba47a9df0';

const App = () => {
  const [ futureWeather, setFutureWeather ] = useState(null);
  const [ currentWeather, setCurrentWeather ] = useState({});
  const [ isError, setIsError ] = useState(false);
  const [ location, setLocation ] = useState({});

  useEffect( () => {
    getWeather('London');
  }, [])

  const getWeather = city => {
    axios.get(`weather?q=${city}&appid=${appID}`)
      .then( response => {
        console.log(response)
        getUsefulDataCurrent( response.data );
      })
      .catch( err => {
        console.log(err)
        setIsError(true);
      })
    axios.get(`forecast?q=${city}&APPID=${appID}`)
      .then( response => {
        console.log(response)
        getUsefulDataForecast( response.data );
      })
      .catch( err => {
        console.log(err);
        setIsError(true);
      })
  }

  const getUsefulDataCurrent = data => {
    const help = {
      temp: data.main.temp,
      feels_like: data.main.feels_like,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      weatherState: data.weather[0].description,
      weatherIcon: data.weather[0].icon,
      wind: data.wind.speed,
      day: weekDay()
  }
    setCurrentWeather(help);
  }

  const getUsefulDataForecast = data => {
    //Finds first full day
    let midnightIndex;
    for (let i = 0; i < 7; i++) {
      if ( data.list[i].dt_txt.search('00:00:00') !== -1 ) {
        midnightIndex = i;
        break;
      }
    }

    let forecastArray = [{
      city: data.city.name,
      country: data.city.country
    }]
    for ( let i = midnightIndex; i < 40; i += 8 ) {
      let minTemp = data.list[i].main.temp_min;
      let maxTemp = data.list[i].main.temp_max;
      const range = i < 32 ? 8 : 8 - midnightIndex;  
      for ( let j = 0; j < range; j++ ) {
        if ( data.list[i + j].main.temp_min < minTemp ) {
          minTemp = data.list[i + j].main.temp_min;
        }
        if ( data.list[i + j].main.temp_max > maxTemp ) {
          maxTemp = data.list[i + j].main.temp_max;
        }
      }
      const help = {
        minTemp: Math.round(minTemp - 273.15),
        maxTemp: Math.round(maxTemp - 273.15),
        humidity: data.list[i].main.humidity,
        pressure: data.list[i].main.pressure,
        weatherState: data.list[i].weather[0].description,
        weatherIcon: data.list[i].weather[0].icon,
        wind: data.list[i].wind.speed,
        day: weekDay(data.list[i].dt_txt)
      }
      forecastArray.push( help );
    }
    makeFutureDataArray( forecastArray );
  }

  const makeFutureDataArray = data => {
    let futureWeather = [];
    for ( let i = 0; i < 5; i++ ) {
      futureWeather[i] = <FutureData 
        key={i}
        onClick={() => getFullData(i + 1)} 
        data={data[i + 1]}
        />
    }
    setFutureWeather( futureWeather );
    setLocation( data[0] );
  }

  const weekDay = (date = Date.now()) => {
    const time = new Date(date);
    const help = time.getDay();
    switch( help ) {
        case 0:
            return 'Sunday'
        case 1:
            return 'Monday'
        case 2:
            return 'Thuesday'
        case 3:
            return 'Wednesday'
        case 4:
            return 'Thursday'
        case 5:
            return 'Friday'
        case 6:
            return 'Saturday'
        default:
            break;
    }
}

  const getFullData = index => {

  }

  return (
    <>
      <WeatherInput handleSubmit={getWeather} error={isError}/>
      <FullData location={location} data={currentWeather}/>
      {futureWeather}
    </>
  );
}

export default App;
