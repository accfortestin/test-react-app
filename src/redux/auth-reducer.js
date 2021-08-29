import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_ERROR_TEXT = 'SET_ERROR_TEXT';
const SET_URL_CAPTCHA = 'SET_URL_CAPTCHA';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    error: null,
    captchaURL: null
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
        case SET_URL_CAPTCHA:
            return {
                ...state,
                captchaURL: action.captchaURL
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

export const setCaptchaURL = (captchaURL) => ({
    type: SET_URL_CAPTCHA,
    captchaURL
})

//thunks 

export const getAuth = () => async (dispatch) => {
    let data = await authAPI.getAuth();
    if (data.resultCode === 0) {
        let { id, email, login } = data.data;
        dispatch(setUserAuthData(id, email, login, true));
    }
}

export const logIn = (logInData) => {
    let { email, password, rememberMe, captcha } = logInData;
    return async (dispatch) => {
        let data = await authAPI.login(email, password, rememberMe, captcha)
        if (data.resultCode === 0) {
            dispatch(getAuth());
            dispatch(setCaptchaURL(null));
        } else {
            if (data.resultCode === 10) {
                let captcha = await securityAPI.getCaptcha();
                dispatch(setCaptchaURL(captcha.url));
            }
            dispatch(setErrorText(data.messages));
        }
    }
}

export const logOut = () => async (dispatch) => {
    let data = await authAPI.logout()
    if (data.resultCode === 0) {
        dispatch(setUserAuthData(null, null, null, false));
    }
}


export default authReducer;