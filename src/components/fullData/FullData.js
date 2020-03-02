import React from 'react';

import styles from './fullData.module.css';

const FullData = props => {
    return(
        <div className={styles.fullData}>
            <p>{`${props.location.city}, ${props.location.country}`}</p>
            <p>{props.caption}</p>
            <img className={styles.img} 
                src={`http://openweathermap.org/img/wn/${props.data.weatherIcon}@2x.png`}
                alt='ups'/>
        </div>
    );
}

export default FullData;