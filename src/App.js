import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import WeatherInput from './components/weatherInput/WeatherInput';
import FullData from './components/fullData/FullData';
import FutureData from './components/futureData/FutureData';


import './App.css';

const App = (props) => {
  const [ futureWeather, setFutureWeather ] = useState(null);
  const [ location, setLocation ] = useState({});

  useEffect(() => {
    if (props.futureWeather[0]) {
      makeFutureDataArray(props.futureWeather);
    } 
  }, [props.futureWeather])
 
  const makeFutureDataArray = data => {
    let futureWeather = [];
    for ( let i = 0; i < 5; i++ ) {
      futureWeather[i] = <FutureData 
        key={i} 
        data={data[i + 1]}
        />
    }
    setFutureWeather( futureWeather );
    setLocation( data[0] );
  }

  return (
    <>
      <WeatherInput error={props.isError}/>
      <FullData location={location} 
        caption={`${props.currentWeather.day}, ${props.currentWeather.time}, ${props.currentWeather.weatherState}`}
        data={props.currentWeather}/>
      {futureWeather}
    </>
  );
}

const mapStateToProps = state => {
  return {
    currentWeather: state.current,
    futureWeather: state.future,
    isError: state.error
  }
}

export default connect(mapStateToProps, null)(App);
