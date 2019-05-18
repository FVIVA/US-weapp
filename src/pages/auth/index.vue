<template>
  <div class="box">
    <img class="bg" src="../../../static/images/pesonbg.jpg">
    <div class="main">
      <i-panel title="姓名">
        <input v-model="auth.user_name" placeholder="请输入姓名" />
      </i-panel>
      <i-panel title="学校">
        <input v-model="auth.school" placeholder="请输入学校" />
      </i-panel>
      <i-panel title="学号">
        <input v-model="auth.study_num" type="number" placeholder="请输入学号" />
      </i-panel>
      <i-panel title="班级号">
        <input v-model="auth.class_num" type="number" placeholder="请输入班级号" />
      </i-panel>
      <i-button class="sb-button" type="warning" @click="toEditInfo">去认证</i-button>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  onShow () {
    wx.setNavigationBarTitle({title: '学生认证'})
    this.getInfo()
  },
  components: {
  },
  data () {
    return {
      auth: {}
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  methods: {
    getInfo () {
      this.auth = {
        user_id: this.userInfo.user_id
      }
    },
    toEditInfo () {
      wx.cloud.callFunction({
        name: 'addAuth',
        data: this.auth
      }).then(res => {
        wx.showToast({
          title: '提交认证成功，待审核',
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


