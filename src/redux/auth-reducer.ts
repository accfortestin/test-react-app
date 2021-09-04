import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_ERROR_TEXT = 'SET_ERROR_TEXT';
const SET_URL_CAPTCHA = 'SET_URL_CAPTCHA';

export type InitialStateType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    error: null | string
    captchaURL: null | string
}

let initialState: InitialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    error: null,
    captchaURL: null
}

let authReducer = (state = initialState, action: any): InitialStateType  => {

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

type UserAuthDataType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean | null
}

type SetUserAuthDataType = {
    type: typeof SET_USER_DATA
    data: UserAuthDataType
}

export const setUserAuthData = (id: number | null, email: string | null, login: string | null, isAuth: boolean | null): SetUserAuthDataType => ({
    type: SET_USER_DATA,
    data: {id, email, login, isAuth}
})

type SetErrorTextType = {
    type: typeof SET_ERROR_TEXT
    error: string | null
}

export const setErrorText = (error: string): SetErrorTextType => ({
    type: SET_ERROR_TEXT,
    error
})

type SetCaptchaURLType = {
    type: typeof SET_URL_CAPTCHA
    captchaURL: string | null
}

export const setCaptchaURL = (captchaURL: string | null): SetCaptchaURLType => ({
    type: SET_URL_CAPTCHA,
    captchaURL
})

//thunks 

export const getAuth = () => async (dispatch: any) => {
    let data = await authAPI.getAuth();
    if (data.resultCode === 0) {
        let { id, email, login } = data.data;
        dispatch(setUserAuthData(id, email, login, true));
    }
}

export type LogInDataType = {
    email: string | null
    password: string | null
    rememberMe: boolean
    captcha: string | null
}

export const logIn = (logInData: LogInDataType) => {
    let { email, password, rememberMe, captcha } = logInData;
    return async (dispatch: any) => {
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

export const logOut = () => async (dispatch: any) => {
    let data = await authAPI.logout()
    if (data.resultCode === 0) {
        dispatch(setUserAuthData(null, null, null, false));
    }
}


export default authReducer;