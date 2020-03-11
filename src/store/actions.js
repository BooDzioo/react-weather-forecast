import axios from 'axios';

import appID from './appID';

export const REQUEST_SUCCES = 'REQUEST_SUCCES';
export const REQUEST_REJECT = 'REQUEST_REJECT';

export const currentResponseFilter = (response) => {
    return dispatch => {
        const date = new Date();

        const weatherStateUpperCase = (state) => {
            const i = state.search(' ');
            let help = state.charAt(0).toUpperCase() + state.slice(1);
            if ( i !== -1 ) {
                help = `${help.slice(0, i)} ${state.charAt(i + 1).toUpperCase()}${state.slice(i + 2)}`;
                console.log(help)
            }
            return help;
        }

        const help = {
            temp: Math.round(response.main.temp - 273.15),
            feels_like: response.main.feels_like,
            humidity: response.main.humidity,
            pressure: response.main.pressure,
            weatherState: weatherStateUpperCase(response.weather[0].description),
            weatherIcon: response.weather[0].icon,
            wind: response.wind.speed,
            day: weekDay(),
            time: `${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`
        }
        
        dispatch({type: REQUEST_SUCCES, current: help})
    }
}

export const futureResponseFilter = (response) => {
    return dispatch => {
        let midnightIndex;
        for (let i = 0; i < 7; i++) {
            if ( response.list[i].dt_txt.search('00:00:00') !== -1 ) {
                midnightIndex = i;
                break;
            }
        }

        let forecastArray = [{
            city: response.city.name,
            country: response.city.country
        }]
        for ( let i = midnightIndex; i < 40; i += 8 ) {
            let minTemp = response.list[i].main.temp_min;
            let maxTemp = response.list[i].main.temp_max;
            const range = i < 32 ? 8 : 8 - midnightIndex;  
            for ( let j = 0; j < range; j++ ) {
                if ( response.list[i + j].main.temp_min < minTemp ) {
                    minTemp = response.list[i + j].main.temp_min;
                }
                if ( response.list[i + j].main.temp_max > maxTemp ) {
                    maxTemp = response.list[i + j].main.temp_max;
                }
            }
            const help = {
                minTemp: Math.round(minTemp - 273.15),
                maxTemp: Math.round(maxTemp - 273.15),
                humidity: response.list[i].main.humidity,
                pressure: response.list[i].main.pressure,
                weatherState: response.list[i].weather[0].description,
                weatherIcon: response.list[i].weather[0].icon.substring(0, response.list[i].weather[0].icon.length - 1) + 'd',
                wind: response.list[i].wind.speed,
                day: weekDay(response.list[i].dt_txt)
            }
            forecastArray.push( help );
        }
        dispatch({type: REQUEST_SUCCES, future: forecastArray})
  }
}

export const requestStart = (city) => {
    return dispatch => {
        axios.get(`weather?q=${city}&appid=${appID}`)
        .then(response => {
            console.log(response);
            dispatch(currentResponseFilter(response.data))
            axios.get(`forecast?q=${city}&APPID=${appID}`)
                .then(response => {
                    console.log(response)
                    dispatch(futureResponseFilter(response.data))
                })
                .catch(err => {
                    console.log(err);
                    dispatch({type: REQUEST_REJECT});
                })
        })
        .catch(err => {
            console.log(err);
            dispatch({type: REQUEST_REJECT})
        })
    }
}

const weekDay = (date = Date.now()) => {
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