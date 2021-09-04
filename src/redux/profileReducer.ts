import { profileAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const UPDATE_MAIN_PHOTO = 'UPDATE_MAIN_PHOTO';
const UPDATE_PROFILE_DATA = 'UPDATE_PROFILE_DATA';

export type PostDataType = {
    id: number
    message: string
    likeCounter: number
}

export type ContactsType = {
    [key: string]: string
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type UserProfileDataType = {
    aboutMe: string | null
    contacts: ContactsType
    fullName: string | null
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    photos: PhotosType
    userId: number
}

let initialState = {
    postData:[
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
    ] as Array<PostDataType>,
    userProfileData: null as UserProfileDataType | null,
    userStatus: null as string | null
}

let profileReducer = (state = initialState, action: any) => {

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
            console.log(state.userProfileData)
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

type  addPostActionType = {
    type: typeof ADD_POST
    newPostText: string
}  

export const addPost = (newPostText: string): addPostActionType => ({
    type: ADD_POST,
    newPostText
})

type setUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profileData: UserProfileDataType
}

export const setUserProfile = (profileData: UserProfileDataType): setUserProfileActionType => ({
    type: SET_USER_PROFILE,
    profileData
})

type setUserStatusActionType = {
    type: typeof SET_USER_STATUS
    status: string
}

export const setUserStatus = (status: string): setUserStatusActionType => ({
    type: SET_USER_STATUS,
    status
})

type updateMainPhotoActionType = {
    type: typeof UPDATE_MAIN_PHOTO
    photos: PhotosType
}

export const updateMainPhoto = (photos: PhotosType): updateMainPhotoActionType => ({
    type: UPDATE_MAIN_PHOTO,
    photos
})

//thunks

export const getProfile = (userID: number | null) => {
    return (dispatch: any) => {
        profileAPI.getProfile(userID).then((data: any) => {
            dispatch(setUserProfile(data))
        })
    }
}

export const getUserStatus = (userID: number) => {
    return (dispatch: any) => {
        profileAPI.getUserStatus(userID).then((data: any) => {
            dispatch(setUserStatus(data))
        })
    }
}

export const updateUserStatus = (status: string) => {
    return async (dispatch: any) => {
        let data = await profileAPI.updateUserStatus(status)
        
        if (data.resultCode === 0) {
            dispatch(setUserStatus(status))
        }
    }
}

export const uploadMainPhoto = (photo: any) => {
    return async (dispatch: any) => {
        let data = await profileAPI.uploadMainPhoto(photo)
        if (data.resultCode === 0) {
            dispatch(updateMainPhoto(data.data.photos))
        }
    }
}

export const editProfileData = (newData: any) => {
    return async (dispatch: any, getState: any) => {
        const id = getState().auth.id;
        let data = await profileAPI.editProfileData(newData)
        if (data.resultCode === 0) {
            dispatch(getProfile(id));
        }
    }
}

export default profileReducer;