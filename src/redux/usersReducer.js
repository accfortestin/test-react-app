import { usersAPI } from "../api/api";

const FOLLOW_TOGGLER = 'FOLLOW-TOGGLER';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const SET_FETCHING_STATUS = 'SET_FETCHING_STATUS';
const SET_FOLLOWING_PROGRESS = 'SET_FOLLOWING_PROGRESS';
const SET_PORTION_NUMBER = 'SET_PORTION_NUMBER';

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    portionNumber: 1
}

let usersReducer = (state = initialState, action) => {

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
                : state.followingInProgress.filter(id => id !== action.userID)
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

export const changeFollowStatus = (userID, isFollowed) => ({
    type: FOLLOW_TOGGLER,
    userID,
    isFollowed
})

export const setUsers = (users) => ({
    type: SET_USERS,
    users
})

export const setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage
})

export const setTotalUsersCount = (count) => ({
    type: SET_TOTAL_USERS_COUNT,
    count
})

export const setFetchingStatus = (status) => ({
    type: SET_FETCHING_STATUS,
    status
})

export const setFollowingProgress = (status, userID) => ({
    type: SET_FOLLOWING_PROGRESS,
    status,
    userID
})

export const setPortionNumber = (number) => ({
    type: SET_PORTION_NUMBER,
    number
})


//thunks

export const getUsers = (pageSize, currentPage) => {
    return (dispatch) => {
        dispatch(setCurrentPage(currentPage));
        dispatch(setFetchingStatus(true));
        usersAPI.getUsers(pageSize, currentPage).then(data => {
            dispatch(setFetchingStatus(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
        })
    }
}

export const follow = (id) => {
    return (dispatch) => {
        dispatch(setFollowingProgress(true, id));
        usersAPI.followUser(id).then(data => {
            if (data.resultCode === 0) {
                dispatch(changeFollowStatus(id, true));
            }
            dispatch(setFollowingProgress(false, id));
        })
    }
}

export const unfollow = (id) => {
    return (dispatch) => {
        dispatch(setFollowingProgress(true, id));
        usersAPI.unfollowUser(id).then(data => {
            if (data.resultCode === 0) {
                dispatch(changeFollowStatus(id, false));
            }
            dispatch(setFollowingProgress(false, id));
        })
    }
}


export default usersReducer;