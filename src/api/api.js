import * as axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "d6125f8b-56fe-4511-bfa3-390cf0a89dfb"
      },
    baseURL: "https://social-network.samuraijs.com/api/1.0/"
})

export const usersAPI = {
    getUsers(pageSize, currentPage) {
        return instance.get(`users?count=${pageSize}&page=${currentPage}`).then(response => response.data);
    },
    followUser(id) {
        return instance.post(`follow/${id}`).then(response => response.data);
    },
    unfollowUser(id) {
        return instance.delete(`follow/${id}`).then(response => response.data);
    }
}

export const profileAPI = {
    getProfile(userID) {
        return instance.get(`profile/${userID}`).then(response => response.data);
    },
    getUserStatus(userId) {
        return instance.get(`/profile/status/${userId}`).then(response => response.data)
    },
    updateUserStatus(status) {
        return instance.put(`/profile/status/`, {status: status}).then(response => response.data)
    }
}

export const authAPI = {
    getAuth() {
        return instance.get(`auth/me`).then(response => response.data);
    },
    login(email, password, rememberMe) {
        return instance.post(`auth/login`, {email, password, rememberMe}).then(response => response.data);
    },
    logout() {
        return instance.delete(`auth/login`).then(response => response.data);
    }
}
