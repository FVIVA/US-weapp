<template>
  <div>
    <div class="bt" @click="show = true"></div>
    <i-drawer mode="left" :visible="show" @close="show = !show">
      <view class="container">
        <div class="bt" @click="show = !show"></div>
        <div class="enter">
          <div class="item" style="background: rgba(34, 117, 133, 1)" @click="toUsersAdmin">
            用户管理
          </div>
          <div class="item" style="background: rgba(255, 195, 0, 1)" @click="toAdsAdmin">
            广告位管理
          </div>
          <div class="item" style="background: rgba(0, 186, 173, 1)" @click="toGoodsAdmin">
            物品管理
          </div>
          <div class="item" style="background: rgba(165, 214, 63, 1)" @click="toAuthAdmin">
            学生认证
          </div>
          <div class="item" style="background: rgba(165, 214, 63, 1)" @click="toNewsAdmin">
            资讯管理
          </div>
          <div class="index" @click="toIndex"></div>
        </div>
      </view>
    </i-drawer>
  </div>
</template>
<script>
export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    toUsersAdmin () {
      wx.navigateTo({
        url: '/pages/userAdmin/main'
      })
    },
    toAdsAdmin () {
      wx.navigateTo({
        url: '/pages/adAdmin/main'
      })
    },
    toAuthAdmin () {
      wx.navigateTo({
        url: '/pages/authAdmin/main'
      })
    },
    toGoodsAdmin () {
      wx.navigateTo({
        url: '/pages/goodsAdmin/main'
      })
    },
    toNewsAdmin () {
      wx.navigateTo({
        url: '/pages/userAdmin/main'
      })
    },
    toIndex () {
      wx.switchTab({url: '/pages/index/main'})
    }
  }
}
</script>

<style lang="scss" scoped>
.bt {
  width: 60rpx;
  height: 60rpx;
  background: url('../../static/images/menu-s.png');
  background-size: cover;
  position: fixed;
  top: 20rpx;
  left: 40rpx;
  cursor: pointer;
}
.container {
  background: #fff;
  width: 400rpx;
  height: 100vh;
}
.enter {
  margin-top: 100rpx;
  width: 80%;
}
.item {
  width: 100%;
  height: 60rpx;
  line-height: 60rpx;
  font-size: 24rpx;
  border-radius: 60rpx;
  cursor: pointer;
  margin: 0 auto;
  margin-bottom: 40rpx;
  text-align:  center;
  color: #fff;
}
.index{
  width: 60rpx;
  height: 60rpx;
  background-size: cover;
  background: url('../../static/images/shouye.png');
  margin: 0  auto;
}
</style>
