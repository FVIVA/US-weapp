<template>
  <div class="info">
    <div class="info_item">
      <i-panel hide-border>
        <view>
          <textarea class="info_txt" placeholder="写下你与旧物的故事..." v-model="goods.remark"></textarea>
        </view>
      </i-panel>
    </div>
    <div class="info_item">
      <i-panel hide-border>
        <view style="padding: 10rpx;">
          <div class="info_img">
            <div class="info_img_item" v-for="item in fileList" :key="item.id">
              <img :src="item" mode="aspectFill">
            </div>
            <div @click="chooseImg" class="info_img_item" v-if="showAdd">
              <img class="add-img" src="../../../static/images/add.png">
            </div>
          </div>
        </view>
      </i-panel>
    </div>
    <div class="info_item" style="border-bottom: rgb(247,247,247) 1rpx solid">
      <i-panel hide-border>
        <span>添加标题</span><input  placeholder="写下你的标题吧..." v-model="goods.goods_name">
      </i-panel>
    </div>
    <div class="info_item" style="border-bottom: rgb(247,247,247) 1rpx solid">
      <i-panel hide-border>
        <span>添加价格</span><input type="number"  placeholder="你的旧物价值多少U币..." v-model="goods.price">
      </i-panel>
    </div>
    <div class="info_item">
      <i-panel hide-border>
        <i-cell-group>
          <i-cell :title="goods.location" is-link @click.stop="getLocation"><i-icon type="coordinates" slot="icon"/></i-cell>
        </i-cell-group>
      </i-panel>
    </div>
   <div class="send" @click="send">发布</div>
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
        location: '你在哪里?',
        price: '',
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
      if (!this.goods.goods_name) {
        wx.showToast({
          title: '请填写信息',
          icon: 'loading',
          duration: 3000
        })
        return 0
      }
      let data = {}
      data = {...this.goods}
      data.user_avatar = this.userInfo.avatar
      data.user_id = this.userId
      if (this.goods.location === '你在哪里?') {
        data.location = ''
      }
      wx.cloud.callFunction({
        name: 'addGoods',
        data: data
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
                location: '你在哪里?',
                price: 0,
                remark: '',
                goods_name: ''
              }
              this.fileList.length = []
              this.showAdd = true
            }, 2000)
          }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.info {
  padding: 40rpx;
  // background: rgba(#f8f8f9, 0.8);
  &_item {
    margin-bottom: 20rpx;
    input {
      font-size: 28rpx;
      padding: 0 20rpx;
      line-height: 80rpx;
      height: 80rpx;
      display: inline-block;
      width: 70%;
    }
    span {
      display: inline-block;
      line-height: 80rpx;
      height: 80rpx;
      vertical-align: top;
    }
  }
  &_txt {
    min-height: 400rpx;
    font-size: 28rpx;
    color: #495060;
    background: rgb(247,247,247);
    border-radius: 5px;
    padding: 30rpx;
    margin: 0 auto;
    display: block;
    width: 90%;
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
.send {
  width: 100%;
  cursor: pointer;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 60rpx;
  margin: 0 auto;
  background: #ffda00;
  text-align: center;
  margin-top: 100rpx;
}
</style>
