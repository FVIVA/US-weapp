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
      age: 0
    },
    openId: ''
  },
  mutations: {
    updateIsLogin: (state, change) => {
      state.isLogin = change
    },
    updateUserInfo: (state, change) => {
      state.userInfo = change
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
        age: 0
      }
    },
    updateUser: (state, change) => {
      change.gender = change.gender === 1 ? '男' : '女'
      state.userInfo = change
    }
  }
})
export default store
