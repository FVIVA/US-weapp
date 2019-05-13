<template>
  <div class="info">
    <!-- <i-input :value="info.txt" mode="wrapped" type="textarea" title="详细地址"   style="height: 400rpx;"/> -->
    <textarea class="info_txt" placeholder="这一刻的想法..." v-model="dynamic.dynamic_content"></textarea>
    <div class="info_img">
      <div class="info_img_item" v-for="item in fileList" :key="item.id">
        <img :src="item">
      </div>
      <div @click="chooseImg" class="info_img_item" v-if="showAdd">
        <img class="add-img" src="../../../static/images/add.png">
      </div>
    </div>
    <button @click="send">发布</button>
  </div>
</template>
<script>
export default {
  onShow () {
    wx.setNavigationBarTitle({title: '发表动态'})
    console.log(this.wxInfo)
  },
  data () {
    return {
      showAdd: true,
      dynamic: {
        dynamic_content: '',
        dynamic_img: [],
        nickname: '',
        avatar: '',
        user_id: this.userId
      },
      fileList: []
    }
  },
  computed: {
    picLength () {
      return this.dynamic.dynamic_img.length
    },
    wxInfo () {
      return this.$store.state.userInfo
    },
    userId () {
      return this.$store.state.openId.openId
    }
  },
  watch: {
    picLength (newval) {
      if (newval >= 6) {
        this.showAdd = false
      }
    }
  },
  methods: {
    chooseImg () {
      let that = this
      wx.chooseImage({
        count: 6,
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
                that.dynamic.dynamic_img.push(res.fileID)
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
    send () {
      this.dynamic.nickname = this.wxInfo.nickName
      this.dynamic.avatar = this.wxInfo.avatarUrl
      this.dynamic.user_id = this.userId
      console.log(this.dynamic)
      wx.cloud.callFunction({
        name: 'addDynamic',
        data: this.dynamic
      }).then(res => {
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 2000,
          complete: () => {
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/square/main'
              })
              this.dynamic = {
                dynamic_content: '',
                dynamic_img: [],
                nickname: '',
                avatar: '',
                user_id: ''
              }
            }, 3000)
          }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.info {
  padding: 20rpx;
  padding-left: 25rpx;
  &_txt {
    min-height: 400rpx;
    font-size: 28rpx;
    color: #495060;
  }
  &_img {
    height: 600rpx;
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
