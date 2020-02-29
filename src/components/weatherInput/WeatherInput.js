import React, { useState, useRef, useEffect } from 'react';

const WeatherInput = (props) => {
    const [current, setCurrent] = useState('');

    const buttonRef = useRef();

    useEffect(() => {
        document.addEventListener('keydown', (key) => {
            if (key.code === 'Enter') {
                buttonRef.current.click();
            }
        })
        return document.removeEventListener('keydown', (key) => {
            if (key.code === 'Enter') {
                buttonRef.current.click();
            }
        })
    }, [])

    const handleInputChange = (e) => {
        setCurrent(e.target.value);
    }
    const handleSearchClick = () => {
        props.handleSubmit(current);
        setCurrent('');
    }
    return (
        <div>
            <input onChange={e => handleInputChange(e)} value={current} placeholder='Enter city name...'></input>
            <button ref={buttonRef} onClick={handleSearchClick}>Search</button>
        </div>
    );
}

export default WeatherInput;