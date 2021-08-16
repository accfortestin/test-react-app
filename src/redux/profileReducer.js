import { profileAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const UPDATE_MAIN_PHOTO = 'UPDATE_MAIN_PHOTO';
const UPDATE_PROFILE_DATA = 'UPDATE_PROFILE_DATA';

let initialState = {
    postData: [
        {
            id: 1,
            message: "First Post",
            likeCounter: 0,
        },
        {
            id: 2,
            message: "Lorem ipsum dolor set amet",
            likeCounter: 15,
        },
        {
            id: 3,
            message: "Lorem ipsum dolor set amet. Lorem!",
            likeCounter: 11,
        },
    ],
    userProfileData: null,
    userStatus: null
}

let profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            let post = {
                id: state.postData.length + 1,
                message: action.newPostText,
                likeCounter: 0,
            };
            let stateCopy = {
                ...state
            };
            if (action.newPostText !== '') {
                stateCopy.postData = [...state.postData, post];
            }
            return stateCopy;
        case SET_USER_PROFILE:
            return {
                ...state,
                userProfileData: action.profileData
            };
        case SET_USER_STATUS:
            return {
                ...state,
                userStatus: action.status
            };
        case UPDATE_MAIN_PHOTO:
            return {
                ...state,
                userProfileData: {...state.userProfileData, photos: action.photos}
            };
        case UPDATE_PROFILE_DATA:
            return {
                ...state,
                userProfileData: {...state.userProfileData, ...action.newData}
            };
        default:
            return state;
    }
}

export const addPost = (newPostText) => ({
    type: ADD_POST,
    newPostText
})

export const setUserProfile = (profileData) => ({
    type: SET_USER_PROFILE,
    profileData
})

export const setUserStatus = (status) => ({
    type: SET_USER_STATUS,
    status
})

export const updateMainPhoto = (photos) => ({
    type: UPDATE_MAIN_PHOTO,
    photos
})

//thunks

export const getProfile = (userID) => {
    return (dispatch) => {
        profileAPI.getProfile(userID).then(data => {
            dispatch(setUserProfile(data))
        })
    }
}

export const getUserStatus = (userID) => {
    return (dispatch) => {
        profileAPI.getUserStatus(userID).then(data => {
            dispatch(setUserStatus(data))
        })
    }
}

export const updateUserStatus = (status) => {
    return async (dispatch) => {
        let data = await profileAPI.updateUserStatus(status)
        
        if (data.resultCode === 0) {
            dispatch(setUserStatus(status))
        }
    }
}

export const uploadMainPhoto = (photo) => {
    return async (dispatch) => {
        let data = await profileAPI.uploadMainPhoto(photo)
        if (data.resultCode === 0) {
            dispatch(updateMainPhoto(data.data.photos))
        }
    }
}

export const editProfileData = (newData) => {
    return async (dispatch, getState) => {
        const id = getState().auth.id;
        let data = await profileAPI.editProfileData(newData)
        if (data.resultCode === 0) {
            dispatch(getProfile(id));
        }
    }
}

export default profileReducer;