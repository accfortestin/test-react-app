import { authAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_ERROR_TEXT = 'SET_ERROR_TEXT';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    error: null
}

let authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            };
        case SET_ERROR_TEXT:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
}

export const setUserAuthData = (id, email, login, isAuth) => ({
    type: SET_USER_DATA,
    data: {id, email, login, isAuth}
})

export const setErrorText = (error) => ({
    type: SET_ERROR_TEXT,
    error
})

//thunks 

export const getAuth = () => {
    return (dispatch) => {
        return authAPI.getAuth().then(data => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data;
                dispatch(setUserAuthData(id, email, login, true));
            }
        })
    }
}

export const logIn = (logInData) => {
    let {email, password, rememberMe} = logInData;
    return (dispatch) => {
        authAPI.login(email, password, rememberMe).then(data => {
            if (data.resultCode === 0) {
                dispatch(getAuth());
            } else {
                dispatch(setErrorText(data.messages));
            }
        })
    }
}

export const logOut = () => {
    return (dispatch) => {
        authAPI.logout().then(data => {
            if (data.resultCode === 0) {
                dispatch(setUserAuthData(null, null, null, false));
            }
        })
    }
}


export default authReducer;