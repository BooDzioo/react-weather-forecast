import React from 'react';

import styles from './futureData.module.css';

const FutureData =  props  => {
    
    return(
        <div onClick={props.handleClick} className={styles.futureData}>
            <h6>{props.data.day}</h6>
            <img className={styles.img}
                src={`http://openweathermap.org/img/wn/${props.data.weatherIcon}@2x.png`} 
                alt='ups' />
            <p>{`${props.data.maxTemp} / ${props.data.minTemp}`}</p>
        </div>
    );
}

export default FutureData;