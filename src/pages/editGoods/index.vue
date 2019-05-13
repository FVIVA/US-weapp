<template>
  <div class="info">
    <img class="bg" src="../../../static/images/pesonbg.jpg">
    <div class="info_item">
      <i-panel hide-border>
        <input  placeholder="旧物名字..." v-model="goods.goods_name">
      </i-panel>
    </div>
    <div class="info_item">
      <i-panel hide-border>
        <input type="number"  placeholder="添加价格" v-model="goods.price">
      </i-panel>
    </div>
    <div class="info_item">
      <i-panel hide-border>
        <view style="padding: 10rpx;">
          <div class="info_img">
            <div class="info_img_item" v-for="item in goods.goods_img" :key="item.id">
              <img :src="item">
            </div>
          </div>
        </view>
      </i-panel>
    </div>
    <div class="info_item">
      <i-panel hide-border>
        <view style="padding: 10rpx;">
          <textarea class="info_txt" placeholder="写下你与旧物的故事..." v-model="goods.remark"></textarea>
        </view>
      </i-panel>
    </div>
    <div class="info_item">
      <i-panel hide-border>
        <view style="padding: 10rpx;">
          <img style="width:50rpx; height:50rpx;" src="../../../static/images/weizhi.png" @click="getLocation">
          <input style="display: inline-block; width:80%;" v-model="goods.location" placeholder="你的位置">
        </view>
      </i-panel>
    </div>
    <button style="background: #fff;" @click="send">发布</button>
  </div>
</template>
<script>
export default {
  onLoad (options) {
    this.goodsId = options.id
    console.log(options)
  },
  onShow () {
    wx.setNavigationBarTitle({title: '编辑旧物'})
    this.getGoodsInfo()
  },
  data () {
    return {
      goods: {
        goods_img: [],
        user_avatar: '',
        user_id: this.userId,
        location: '',
        price: 0,
        remark: '',
        goods_name: ''
      },
      showAdd: true,
      goodsId: ''
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  watch: {
    picLength (newval) {
      if (newval >= 3) {
        this.showAdd = false
      }
    }
  },
  methods: {
    getGoodsInfo () {
      const data = {
        _id: this.goodsId
      }
      wx.cloud.callFunction({
        name: 'getGoodsList',
        data: data
      }).then(res => {
        this.goods = res.result.data[0]
        console.log(res)
      })
    },
    getLocation () {
      wx.chooseLocation({
        success: res => {
          // console.log(res)
          this.goods.location = res.address
        }
      })
    },
    send () {
      this.goods.user_avatar = this.userInfo.avatar
      this.goods.user_id = this.userInfo.user_id
      this.goods.goods_id = this.goodsId
      wx.cloud.callFunction({
        name: 'updateGoods',
        data: this.goods
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
              this.goods = {
                goods_img: [],
                user_avatar: '',
                user_id: '',
                location: '',
                price: 0,
                remark: '',
                goods_name: ''
              }
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
.info {
  padding: 20rpx;
  background: rgba(#f8f8f9, 0.8);
  height: 100vh;
  &_item {
    margin-bottom: 20rpx;
    input {
      font-size: 28rpx;
      padding: 0 20rpx;
    }
  }
  &_txt {
    min-height: 400rpx;
    font-size: 28rpx;
    color: #495060;
  }
  &_img {
    // height: 600rpx;
    margin-top: 40rpx;
    &_item {
      height: 220rpx;
      width: 220rpx;
      border: #dddee1 solid 1rpx;
      border-radius: 5px;
      position: relative;
      display: inline-block;
      margin: 0 5rpx;
      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
      .add-img{
        width: 100rpx;
        height: 100rpx;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
      }
    }
  }
}
</style>
