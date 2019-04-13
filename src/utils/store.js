import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    isLogin: false,
    userInfo: {
      avatarUrl: '',
      city: '',
      gender: '',
      nickName: '',
      province: '',
      country: ''
    },
    openId: ''
  },
  mutations: {
    updateIsLogin: (state, change) => {
      state.openId = change
    },
    updateUserInfo: (state, change) => {
      state.userInfo = change
    },
    updateOpenId: (state, change) => {
      state.isLogin = change
    },
    cleanUserInfo: (state) => {
      state.userInfo = {
        avatarUrl: '',
        city: '',
        gender: '',
        nickName: '',
        province: '',
        country: ''
      }
    },
    updateUser: (state, change) => {
      change.gender = change.gender === 1 ? '男' : '女'
      state.userInfo = change
    }
  }
})
export default store
