<template>
  <div class="box">
    <div></div>
    <div class="main">
      <h2>完善个人信息</h2>
      <div class="avatar-box">
        <img class="avatar" :src="user.avatar">
        <img class="camera" @click="chooseImg" src="../../../static/images/avatar.png">
      </div>
      <div class="info-item">
        <span>昵称</span>
        <input v-model="user.nickname" placeholder="昵称" />
      </div>
      <div class="info-item">
        <span>年龄</span>
        <input v-model="user.age" placeholder="年龄" />
      </div>
      <div class="info-item">
        <span>性别</span>
        <i-radio-group :current="user.gender" @change="genderChange">
            <i-radio position="left" value="男"></i-radio>
            <i-radio position="left" value="女"></i-radio>
        </i-radio-group>
      </div>
      <div class="sb-button" type="warning" @click="toEditInfo">修改成功</div>
    </div>
  </div>
</template>

<script>
export default {
  onShow () {
    wx.setNavigationBarTitle({title: '修改资料'})
    this.getInfo()
  },
  data () {
    return {
      user: {},
      img: ''
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  methods: {
    getInfo () {
      this.user = {
        age: this.userInfo.age,
        gender: this.userInfo.gender,
        nickname: this.userInfo.nickname,
        user_id: this.userInfo.user_id,
        avatar: this.userInfo.avatar
      }
    },
    toEditInfo () {
      let that = this
      wx.showLoading({
        title: '上传中'
      })
      this.user.avatar = this.img
      let filePath = this.img
      const name = Math.random() * 1000000
      const cloudPath = name + filePath.match(/\.[^.]+?$/)[0]
      wx.cloud.uploadFile({
        cloudPath, // 云存储图片名字
        filePath, // 临时路径
        success: res => {
          console.log('[上传图片] 成功：', res)
          that.user.avatar = res.fileID
        },
        fail: e => {
          console.error('[上传图片] 失败：', e)
        },
        complete: () => {
          wx.hideLoading()
          wx.cloud.callFunction({
            name: 'updateUserInfo',
            data: this.user
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
                }, 2000)
              }
            })
          })
          this.$store.commit('updateUser', this.user)
        }
      })
    },
    genderChange (val) {
      this.user.gender = val.mp.detail.value
    },
    chooseImg () {
      const that = this
      wx.chooseImage({
        count: 6,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          that.img = res.tempFilePaths[0]
          that.user.avatar = res.tempFilePaths[0]
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
  input {
    font-size: 30rpx;
    padding: 0 rpx;
    height: 100rpx;
    line-height: 100rpx;
  }
  
}
.avatar-box {
  text-align: center;
  position: relative;
  margin: 80rpx 0;
  .avatar {
    width: 180rpx;
    height: 180rpx;
    border-radius: 100%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border: #fff 1px solid;
  }
  .camera {
    width: 70rpx;
    height: 70rpx;
    position: absolute;
    bottom: 0rpx;
    right: 35%;
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


