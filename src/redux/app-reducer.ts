import { getAuth } from "./auth-reducer";

const SET_INITIALIZING_STATUS = 'SET_INITIALIZING_STATUS';

export type InitialStateType = {
    isInitialized: boolean
}

let initialState: InitialStateType = {
    isInitialized: false
}

let appReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case SET_INITIALIZING_STATUS:
            return {
                ...state,
                isInitialized: true
            };
        default:
            return state;
    }
}

type SetInitializingStatusType = {
    type: typeof SET_INITIALIZING_STATUS
}
 
export const setInitializingStatus = (): SetInitializingStatusType => ({
    type: SET_INITIALIZING_STATUS
})

//thunks 

export const initializeApp = () => {
    return (dispatch: any) => {
        let authInit = dispatch(getAuth());
        Promise.all([authInit])
            .then(() => {
                dispatch(setInitializingStatus());
            })
    }
}

export default appReducer;