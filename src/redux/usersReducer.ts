import { usersAPI } from "../api/api";

const FOLLOW_TOGGLER = 'FOLLOW-TOGGLER';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const SET_FETCHING_STATUS = 'SET_FETCHING_STATUS';
const SET_FOLLOWING_PROGRESS = 'SET_FOLLOWING_PROGRESS';
const SET_PORTION_NUMBER = 'SET_PORTION_NUMBER';

export type UsersType = {
    name: string
    id: number
    photos: {
        small: string | null
        large: string | null
    }
    status: string | null
    followed: boolean
}

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
    portionNumber: 1
}

export type InitialStateType = typeof initialState

let usersReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case FOLLOW_TOGGLER:
            return {
                ...state,
                users: state.users.map( u => {
                    if (u.id === action.userID) {
                        return {
                            ...u, 
                            followed: action.isFollowed
                        }
                    }
                    return u;
                })
            };
        case SET_USERS:
            return {
                ...state, 
                users: [...action.users]
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.count
            }
        case SET_FETCHING_STATUS:
            return {
                ...state,
                isFetching: action.status
            }
        case SET_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.status ? 
                [...state.followingInProgress, action.userID] 
                : state.followingInProgress.filter((id: number) => id !== action.userID)
            }
        case SET_PORTION_NUMBER:
            return {
                ...state,
                portionNumber: action.number
            }
        default:
            return state;
    }
}

type ChangeFollowStatusActionType = {
    type: typeof FOLLOW_TOGGLER
    userID: number
    isFollowed: boolean
}

export const changeFollowStatus = (userID: number, isFollowed: boolean): ChangeFollowStatusActionType => ({
    type: FOLLOW_TOGGLER,
    userID,
    isFollowed
})

type SetUsersActionType = {
    type: typeof SET_USERS
    users: any
}

export const setUsers = (users:any): SetUsersActionType => ({
    type: SET_USERS,
    users
})

type SetCurrentPageActionType ={
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}

export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({
    type: SET_CURRENT_PAGE,
    currentPage
})

type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}

export const setTotalUsersCount = (count: number): SetTotalUsersCountActionType => ({
    type: SET_TOTAL_USERS_COUNT,
    count
})

type SetFetchingStatusActionType ={
    type: typeof SET_FETCHING_STATUS
    status: boolean
}

export const setFetchingStatus = (status: boolean): SetFetchingStatusActionType => ({
    type: SET_FETCHING_STATUS,
    status
})

type SetFollowingProgressActionType ={
    type: typeof SET_FOLLOWING_PROGRESS
    status: boolean
    userID: number
}

export const setFollowingProgress = (status: boolean, userID: number): SetFollowingProgressActionType => ({
    type: SET_FOLLOWING_PROGRESS,
    status,
    userID
})

type SetPortionNumberActionType = {
    type: typeof SET_PORTION_NUMBER
    number: number
}

export const setPortionNumber = (number: number): SetPortionNumberActionType => ({
    type: SET_PORTION_NUMBER,
    number
})


//thunks

export const getUsers = (pageSize: number, currentPage: number) => {
    return (dispatch: any) => {
        dispatch(setCurrentPage(currentPage));
        dispatch(setFetchingStatus(true));
        usersAPI.getUsers(pageSize, currentPage).then((data: any) => {
            dispatch(setFetchingStatus(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
        })
    }
}

export const follow = (id: number) => {
    return (dispatch: any) => {
        dispatch(setFollowingProgress(true, id));
        usersAPI.followUser(id).then((data: any) => {
            if (data.resultCode === 0) {
                dispatch(changeFollowStatus(id, true));
            }
            dispatch(setFollowingProgress(false, id));
        })
    }
}

export const unfollow = (id: number) => {
    return (dispatch: any) => {
        dispatch(setFollowingProgress(true, id));
        usersAPI.unfollowUser(id).then((data: any) => {
            if (data.resultCode === 0) {
                dispatch(changeFollowStatus(id, false));
            }
            dispatch(setFollowingProgress(false, id));
        })
    }
}


export default usersReducer;