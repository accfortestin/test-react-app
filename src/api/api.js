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
    },
    uploadMainPhoto(photo) {
        const formData = new FormData();
        formData.append('image', photo);
        return instance.put(`/profile/photo/`, formData).then(response => response.data)
    },
    editProfileData(newData) {
        return instance.put(`/profile`, {...newData}).then(response => response.data)
    },
}

export const authAPI = {
    getAuth() {
        return instance.get(`auth/me`).then(response => response.data);
    },
    login(email, password, rememberMe, captcha) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha}).then(response => response.data);
    },
    logout() {
        return instance.delete(`auth/login`).then(response => response.data);
    }
}

export const securityAPI = {
    getCaptcha() {
        return instance.get(`security/get-captcha-url`).then(response => response.data);
    }
}