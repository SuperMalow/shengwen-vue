import { defineStore } from 'pinia';

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/";

export const useUserStore = defineStore('user', {
    state: () => ({
        // 以下为用户相关字段，可以根据后端返回的用户字段自行修改
        uuid: null,
        username: null,
        email: null,
        photo: null,
        profile: null,

        // 以下为 token 相关
        accessToken: null,
        hasPullUserInfo: false,
    }),
    getters: {
        // 是否登录
        isLogin: (state) => state.accessToken !== null,
        // 是否已经拉取用户信息
        isPullUserInfo: (state) => state.hasPullUserInfo,

        // 以下为用户相关字段，可以根据后端返回的用户字段自行修改
        userPhoto: (state) => state.photo ? BASE_URL + state.photo : '',
        userName: (state) => state.username,
    },
    actions: {
        // 设置 access token
        setAccessToken(accessToken) {
            this.accessToken = accessToken;
        },
        // 设置是否已经拉取用户信息
        setHasPullUserInfo(hasPullUserInfo) {
            this.hasPullUserInfo = hasPullUserInfo;
        },
        // 退出登录
        logout() {
            this.accessToken = null;
            this.hasPullUserInfo = false;

            // 清空用户信息，可根据不同的用户字段自行初始化
            this.uuid = null;
            this.username = null;
            this.email = null;
            this.photo = null;
            this.profile = null;
        },

        // 以下为用户相关字段，可以根据后端返回的用户字段自行修改
        // 设置用户信息
        setUserInfo(data) {
            this.uuid = data.uuid;
            this.username = data.username;
            this.email = data.email;
            this.photo = data.photo;
            this.profile = data.profile;
        },
        // 部分更新用户信息
        updateUserProfile(data) {
            if (data.username !== undefined) this.username = data.username;
            if (data.profile !== undefined) this.profile = data.profile;
            if (data.photo !== undefined) this.photo = data.photo;
        },
    },
});