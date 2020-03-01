import React from 'react';

import styles from './futureData.module.css';

const FutureData =  props  => {
    
    return(
        <div onClick={props.handleClick} className={styles.futureData}>
            <h6>{props.data.day}</h6>
            <img className={styles.img}
                src={`https://www.metaweather.com/static/img/weather/${props.data.weather_state_abbr}.svg`} 
                alt='ups' />
            <p>{`${props.data.maxTemp} / ${props.data.minTemp}`}</p>
        </div>
    );
}

export default FutureData;