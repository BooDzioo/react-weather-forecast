import React from 'react';

import styles from './fullData.module.css';

const FullData = props => {
    return(
        <div className={styles.fullData}>
            <p>{`${props.data.title}, ${props.data.parent.title}`}</p>
            <img className={styles.img} 
                src={`https://www.metaweather.com/static/img/weather/${props.data.consolidated_weather[props.current].weather_state_abbr}.svg`}
                alt='ups'/>
        </div>
    );
}

export default FullData;