import * as actionTypes from './actions';

const initialState = {}

const reducer = ( state = initialState, action ) => {
    switch(action.type) {
        case actionTypes.REQUEST_SUCCES:
            if (action.current) return {...state, current: action.current, error: false}
            if (action.future) return {...state, future: action.future, error: false}
        case actionTypes.REQUEST_REJECT:
            return {
                error: true
            }
        default:
            return state;
    }
}

export default reducer;