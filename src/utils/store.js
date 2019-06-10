import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    isLogin: false,
    userInfo: {
      nickname: '',
      avatar: '',
      gender: '',
      intergral: 0,
      user_id: '',
      user_name: '',
      user_type: 0,
      age: 0,
      change_time: 0
    },
    openId: '',
    goodsLike: [],
    dynamicLike: [],
    adminIs: false
  },
  mutations: {
    updateIsLogin: (state, change) => {
      state.isLogin = change
    },
    updateOpenId: (state, change) => {
      state.openId = change
    },
    cleanUserInfo: (state) => {
      state.userInfo = {
        nickname: '',
        avatar: '',
        gender: '',
        intergral: 0,
        user_id: '',
        user_name: '',
        user_type: 0,
        age: 0,
        school: '',
        class_num: '',
        change_time: 0
      }
    },
    updateUser: (state, change) => {
      change.gender = change.gender === 1 ? '男' : '女'
      // state.userInfo = change
      if (change.nickname) {
        state.userInfo.nickname = change.nickname
      }
      if (change.avatar) {
        state.userInfo.avatar = change.avatar
      }
      if (change.age) {
        state.userInfo.age = change.age
      }
      if (change.user_name) {
        state.userInfo.user_name = change.user_name
      }
      if (change.gender) {
        state.userInfo.gender = change.gender
      }
      if (change.intergral) {
        state.userInfo.intergral = change.intergral
      }
      if (change.user_type) {
        state.userInfo.user_type = change.user_type
      }
      if (change.school) {
        state.userInfo.school = change.school
      }
      if (change.user_id) {
        state.userInfo.user_id = change.user_id
      }
      if (change.change_time) {
        state.userInfo.change_time = change.change_time
      }
    },
    updateGoodsLike: (state, change) => {
      state.goodsLike = change
    },
    updateDynamicLike: (state, change) => {
      state.dynamicLike = change
    },
    updateAdminInfo: (state, change) => {
      state.adminIs = change
    }
  }
})
export default store
