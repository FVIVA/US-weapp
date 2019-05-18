<template>
  <div class="main">
    <div class="item" style="background: rgba(34, 117, 133, 1)" @click="toUsersAdmin">
      <span>用户管理</span>
      <img src="/static/images/admin_user.png">
    </div>
    <div class="item" style="background: rgba(255, 195, 0, 1)" @click="toAdsAdmin">
      <span>广告位管理</span>
    </div>
    <div class="item" style="background: rgba(0, 186, 173, 1)" @click="toGoodsAdmin">
      <span>物品管理</span>
    </div>
    <div class="item" style="background: rgba(165, 214, 63, 1)" @click="toAuthAdmin">
      <span>学生认证</span>
    </div>
    <div class="item" style="background: rgba(165, 214, 63, 1)" @click="toNewsAdmin">
      <span>资讯管理</span>
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
    toUsersAdmin () {
      wx.navigateTo({
        url: '/pages/userAdmin/main'
      })
    },
    toAdsAdmin () {},
    toAuthAdmin () {},
    toGoodsAdmin () {},
    toNewsAdmin () {}
  }
}
</script>
<style lang="scss" scoped>
.main {
  height: 100%;
  width: 100vw;
  background: #fff;
  position: relative;
  padding-top: 30rpx;
}
.item {
  border-radius: 0.033rem;
  width: 80%;
  height: 300rpx;
  box-shadow: 0 0.04rem 0.04rem 0 rgba(0,0,0,0.5);
  margin: 0 auto;
  margin-bottom: 30rpx;
  padding: 40rpx;
  color: #fff;
  font-size: 50rpx;
  img {
    width: 300rpx;
    height: 300rpx;
  }
  span {
    vertical-align: top;
    margin-right: 100rpx;
  }
}
</style>
