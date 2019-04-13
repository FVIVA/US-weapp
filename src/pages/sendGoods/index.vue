<template>
  <div class="info">
    <img class="bg" src="../../../static/images/pesonbg.jpg">
    <div class="info_item">
      <i-panel hide-border>
        <input  placeholder="旧物名字...">
      </i-panel>
    </div>
    <div class="info_item">
      <i-panel hide-border>
        <input type="number"  placeholder="添加价格">
      </i-panel>
    </div>
    <div class="info_item">
      <i-panel hide-border>
        <view style="padding: 10rpx;">
          <div class="info_img">
            <div class="info_img_item" v-for="item in pics" :key="item.id">
              <img :src="item">
            </div>
            <div @click="chooseImg" class="info_img_item" v-if="showAdd">
              <img class="add-img" src="../../../static/images/add.png">
            </div>
          </div>
        </view>
      </i-panel>
    </div>
    <div class="info_item">
      <i-panel hide-border>
        <view style="padding: 10rpx;">
          <textarea class="info_txt" placeholder="写下你与旧物的故事..."></textarea>
        </view>
      </i-panel>
    </div>
    <div class="info_item">
      <i-panel hide-border>
        <view style="padding: 10rpx;">
          <img style="width:50rpx; height:50rpx;" src="../../../static/images/weizhi.png" @click="getLocation">
          <input style="display: inline-block; width:80%;" v-model="info.location" placeholder="你的位置">
        </view>
      </i-panel>
    </div>
    <button style="background: #fff;">发布</button>
  </div>
</template>
<script>
export default {
  onShow () {
    wx.setNavigationBarTitle({title: '发布旧物'})
  },
  data () {
    return {
      info: {
        txt: '',
        pics: [],
        location: ''
      },
      pics: [],
      showAdd: true
    }
  },
  computed: {
    picLength () {
      return this.pics.length
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
    chooseImg () {
      let that = this
      wx.chooseImage({
        count: 3,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          console.log(res.tempFilePaths.length)
          // 把每次选择的图push进数组
          res.tempFilePaths.forEach(v => {
            if (that.pics.length >= 3) {
              return 0
            }
            that.pics.push(v)
          })
        }
      })
    },
    getLocation () {
      // let that = this
      // wx.getLocation({
      //   type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
      //   success: function (res) {
      //     var latitude = res.latitude// 维度
      //     var longitude = res.longitude// 经度
      //     console.log(res)
      //     wx.openLocation({
      //       latitude,
      //       longitude,
      //       scale: 18
      //     })
      //     // that.loadCity(latitude, longitude)
      //   }
      // })
      wx.chooseLocation({
        success: res => {
          // console.log(res)
          this.info.location = res.address
        }
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
