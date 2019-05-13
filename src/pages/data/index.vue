<template>
  <div class="box">
    <img class="bg" src="../../../static/images/pesonbg.jpg">
    <div class="main">
      <i-input v-model="auth.user_name" mode="wrapped" placeholder="请输入姓名" />
      <i-input v-model="auth.school_number" type="number" mode="wrapped" placeholder="请输入学号" />
      <i-input v-model="auth.class_number" type="number" mode="wrapped" placeholder="请输入学号" />
      <i-button class="sb-button" type="warning" @click="toEditInfo">去认证</i-button>
    </div>
  </div>
</template>

<script>
export default {
  onShow () {
    wx.setNavigationBarTitle({title: '学生认证'})
  },
  components: {
  },
  data () {
    return {
      auth: {}
    }
  },
  methods: {
    toEditInfo () {
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
}
.sb-button {
  width: 90%;
  position: fixed;
  bottom: 100rpx;
}
</style>


