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
            <div class="info_img_item" v-for="item in fileList" :key="item.id">
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
  onShow () {
    wx.setNavigationBarTitle({title: '发布旧物'})
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
      fileList: [],
      showAdd: true
    }
  },
  computed: {
    picLength () {
      return this.fileList.length
    },
    userInfo () {
      return this.$store.state.userInfo
    },
    userId () {
      return this.$store.state.openId.openId
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
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          res.tempFilePaths.forEach(file => {
            wx.showLoading({
              title: '上传中'
            })
            that.fileList.push(file)
            let filePath = file
            const name = Math.random() * 1000000
            const cloudPath = name + filePath.match(/\.[^.]+?$/)[0]
            wx.cloud.uploadFile({
              cloudPath, // 云存储图片名字
              filePath, // 临时路径
              success: res => {
                console.log('[上传图片] 成功：', res)
                that.goods.goods_img.push(res.fileID)
              },
              fail: e => {
                console.error('[上传图片] 失败：', e)
              },
              complete: () => {
                wx.hideLoading()
              }
            })
          })
        }
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
      console.log(this.goods)
      this.dynamic.avatar = this.userInfo.avatar
      this.goods.user_id = this.userId
      wx.cloud.callFunction({
        name: 'addGoods',
        data: this.goods
      }).then(res => {
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 3000,
          complete: () => {
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/index/main'
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
