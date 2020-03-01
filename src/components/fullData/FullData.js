import React from 'react';

import styles from './fullData.module.css';

const FullData = props => {
    const day = new Date();
    const time = `${day.getHours()}:${day.getMinutes()}`;
    return(
        <div className={styles.fullData}>
            <p>{`${props.location.city}, ${props.location.country}`}</p>
            <p>{`${props.data.day}, ${time}, ${props.data.weatherState}`}</p>
            <img className={styles.img} 
                src={'eee'}
                alt='ups'/>
        </div>
    );
}

export default FullData;