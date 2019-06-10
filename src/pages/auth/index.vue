<template>
  <div class="box">
    <h2 style="margin-left:20rpx">学生信息认证</h2>
    <div class="main">
      <div class="info-item">
        <span>姓名</span>
        <input v-model="auth.user_name" placeholder="请输入姓名" />
      </div>
      <div class="info-item">
        <span>学校</span>
        <input v-model="auth.school" placeholder="请输入学校" />
      </div>
      <div class="info-item">
        <span>学号</span>
        <input v-model="auth.study_num" placeholder="请输入学号" />
      </div>
      <div class="info-item">
        <span>班级号</span>
        <input v-model="auth.class_num" placeholder="请输入班级号" />
      </div>
      <div class="sb-button" type="warning" @click="toEditInfo">去认证</div>
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
  top: 100rpx;
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
  width: 100%;
  cursor: pointer;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 60rpx;
  margin: 0 auto;
  background: #ffda00;
  text-align: center;
  margin-top: 200rpx;
}
.info-item {
  span {
    font-size: 24rpx;
    color: #888;
  }
}
</style>


