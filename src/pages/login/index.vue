<template>
  <div class="main">

    <div class="login">
      <div class="login-content">
        <div>管理员登录</div>
        <input placeholder="账号" v-model="login.user" />
        <input type="password" placeholder="密码" v-model="login.psw"/>
        <div class="login-bt" @click="adLogin">Login</div>
      </div>
      <div class="login-tip">由最高管理员添加管理员账号</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      login: {
        user: '',
        psw: ''
      },
      lock: true
    }
  },
  methods: {
    adLogin () {
      if (!this.lock) {
        return 0
      }
      wx.showLoading({
        title: '登录中'
      })
      wx.cloud.callFunction({
        name: 'login',
        data: this.login
      }).then(res => {
        wx.hideLoading()
        if (res.result === 'success') {
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 3000,
            complete: () => {
              wx.navigateTo({
                url: '/pages/adminIndex/main'
              })
            }
          })
        } else {
          wx.showToast({
            title: '用户名或密码错误',
            icon: 'none',
            duration: 3000,
            complete: () => {
              this.login = {
                user: '',
                psw: ''
              }
            }
          })
        }
        console.log(res)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  height: 100vh;
  width: 100vw;
  background: #ddd;
  position: relative;
}
.login {
  width: 70%;
  height: 800rpx;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  text-align: center;
  &-content {
    padding-top: 40rpx;
    width: 100%;
    height: 600rpx;
    background: #fff;
  }
  &-tip {
    margin-top: 40rpx;
    color: #fff;
    font-size: 22rpx;
  }
  &-bt {
    height: 60rpx;
    line-height: 60rpx;
    width: 80%;
    margin: 0 auto;
    background: #000;
    color: #fff;
    border-radius: 60rpx;
    cursor: pointer;
  }
  input {
    border: 2px #000 solid;
    width: 80%;
    margin: 60rpx auto;
    border-radius: 60rpx;
    font-size: 24rpx;
  }
}
</style>
