import React, { useState, useRef, useEffect } from 'react';

import styles from './weatherInput.module.css';

const WeatherInput = (props) => {
    const [current, setCurrent] = useState('');

    const buttonRef = useRef();
    const inputRef = useRef(null);

    useEffect(() => {
        document.addEventListener('keydown', (key) => {
            if (key.code === 'Enter') {
                buttonRef.current.click();
            }
            inputRef.current.focus();
        })

        inputRef.current.focus();

        return document.removeEventListener('keydown', (key) => {
            if (key.code === 'Enter') {
                buttonRef.current.click();
            }
        })
    }, [])

    const handleInputChange = (e) => {
        setCurrent( e.target.value );
    }
    const handleSearchClick = () => {
        props.handleSubmit( current );
        setCurrent('');
    }
    
    let pClass = styles.p;
    let iClass = styles.input;
    if ( props.error ) {
        pClass = styles.p__error;
        iClass = styles.input__error;
    }
    return (
        <div>
            <input ref={inputRef} onChange={e => handleInputChange(e)} className={iClass} value={current} placeholder='Enter city name...'></input>
            <button ref={buttonRef} onClick={handleSearchClick}>Search</button>
            <p className={pClass}>Location Not Found</p>
        </div>
    );
}

export default WeatherInput;