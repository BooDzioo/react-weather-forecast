import axios from 'axios';

export const REQUEST_SUCCES = 'REQUEST_SUCCES';
export const REQUEST_REJECT = 'REQUEST_REJECT';

const appID = 'c9695f512f49eff8710f793ba47a9df0';

export const requestStart = (city) => {
    return dispatch => {
        axios.get(`weather?q=${city}&appid=${appID}`)
        .then(response => {
            console.log(response);
            dispatch({type: REQUEST_SUCCES, current: response});
            axios.get(`forecast?q=${city}&APPID=${appID}`)
                .then(response => {
                    console.log(response)
                    dispatch({type: REQUEST_SUCCES, future: response})
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