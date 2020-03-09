import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';

import styles from './weatherInput.module.css';

const WeatherInput = (props) => {
    const [current, setCurrent] = useState('');

    const buttonRef = useRef();
    const inputRef = useRef(null);
    
    let error = props.error;

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
        // if ( e.target.value.length === 1 ) {
        //     props.setError(false);
        // }
    }
    const handleSearchClick = () => {
        props.handleSubmit( current );
        props.requestStart( current );
        setCurrent('');
    }
    
        let pClass = styles.p;
        let iClass = styles.input;

    if ( error ) {
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

const mapDispatchToProps = dispatch => {
    return {
        requestStart:(city) => dispatch(actionTypes.requestStart(city))
    }
}

export default connect(null, mapDispatchToProps)(WeatherInput);