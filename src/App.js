import React, {useState} from 'react';
import axios from 'axios';

import WeatherInput from './components/weatherInput/WeatherInput';
import FullData from './components/fullData/FullData';
import FutureData from './components/futureData/FutureData';

import './App.css';

axios.defaults.baseURL = "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location";

const App = () => {
  const [cityWeather, setCityWeather] = useState(null);

  const getWeather = (city) => {
    axios.get(`/search/?query=${city}`)
      .then(location => {
        axios.get(`${location.data[0].woeid}`)
          .then(weather => {
            console.log(weather);
            setCityWeather(weather);
          })
      })
  }

  return (
    <>
      <WeatherInput handleSubmit={getWeather}/>
      <FullData />
    </>
  );
}

export default App;
