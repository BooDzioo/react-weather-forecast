import React from 'react';

import styles from './futureData.module.css';

const FutureData =  props  => {
    const weekDay = date => {
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
    return(
        <div onClick={props.handleClick} className={styles.futureData}>
            <h6>{weekDay(props.data.applicable_date)}</h6>
            <img className={styles.img}
                src={`https://www.metaweather.com/static/img/weather/${props.data.weather_state_abbr}.svg`} 
                alt='ups' />
            <p>{`${Math.round( props.data.max_temp )} / ${Math.round( props.data.min_temp)}`}</p>
        </div>
    );
}

export default FutureData;