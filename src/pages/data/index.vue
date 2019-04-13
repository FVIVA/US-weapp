<template>
  <div class="box">
    <img class="bg" src="../../../static/images/pesonbg.jpg">
    <div class="main">
      <div class="item">
        <span class="title">昵称</span>
        <input type="text" confirm-type="next">
      </div>
      <div class="item">
        <span class="title">年龄</span>
        <input type="text" confirm-type="next">
      </div>
      <div class="item">
        <span class="title">性别</span>
        <input type="text" confirm-type="next">
      </div>
      <button style="width: 90%;">完成</button>
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

    }
  },
  methods: {
    toEditInfo () {}
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
  // height: 100%;
  position: absolute;
  top: 220rpx;
  left: 0;
  right: 0;
  margin: auto;
  background: rgba(#fff,0.8);
  padding: 20rpx;
  .item {
    width: 100%;
    height: 120rpx;
    line-height: 120rpx;
    text-align: center;
    .title {
      margin-bottom: 30rpx;
      display: inline-block;
      font-size: 28rpx;
    }
    input {
      display: inline-block;
      border-bottom: #ccc 1px solid;
      margin-left: 20rpx;
      font-size: 28rpx;
    }
  }
  
}
</style>


