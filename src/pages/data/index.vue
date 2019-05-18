<template>
  <div class="box">
    <img class="bg" src="../../../static/images/pesonbg.jpg">
    <div class="main">
      <i-panel title="昵称">
        <input v-model="user.nickname" placeholder="昵称" />
      </i-panel>
      <i-panel title="年龄">
        <input v-model="user.age" type="number" placeholder="年龄" />
      </i-panel>
      <i-panel title="性别">
        <i-radio-group :current="user.gender" @change="genderChange">
            <i-radio position="left" value="男"></i-radio>
            <i-radio position="left" value="女"></i-radio>
        </i-radio-group>
      </i-panel>
      <i-button class="sb-button" type="warning" @click="toEditInfo">修改成功</i-button>
    </div>
  </div>
</template>

<script>
export default {
  onShow () {
    wx.setNavigationBarTitle({title: '修改资料'})
    this.getInfo()
  },
  data () {
    return {
      user: {}
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  methods: {
    getInfo () {
      this.user = {
        age: this.userInfo.age,
        gender: this.userInfo.gender,
        nickname: this.userInfo.nickname,
        user_id: this.userInfo.user_id
      }
    },
    toEditInfo () {
      wx.cloud.callFunction({
        name: 'updateUserInfo',
        data: this.user
      }).then(res => {
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 3000,
          complete: () => {
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/personal/main'
              })
            }, 2000)
          }
        })
      })
      this.$store.commit('updateUser', this.user)
    },
    genderChange (val) {
      this.user.gender = val.mp.detail.value
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
  width:100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: -99;
}
.box {
  position: relative;
  height: 100vh;
}
.main {
  width: 90%;
  height: 80vh;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  background: rgba(#fff,0.8);
  padding: 20rpx;
  input {
    font-size: 28rpx;
    padding: 0 20rpx;
    height: 100rpx;
    line-height: 100rpx;
  }
}
.sb-button {
  width: 90%;
  position: fixed;
  bottom: 100rpx;
}
</style>


