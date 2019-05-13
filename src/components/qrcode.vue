<template>
  <div>
    <div class="send_modal" catchtouchmove="ture" v-if="sendModal">
      <div class="send">
        <span style="top: 0; right:20rpx;" @click="toSendGoods">
          <img src="/static/images/wupinlingyong.png">
          <h4>旧物</h4>
        </span>
        <span style="top: 80rpx; left:30rpx;" @click="toSendInfo">
          <img src="/static/images/xiangji.png">
          <h4>动态</h4>
        </span>
      </div>
    </div>
    <button open-type="getUserInfo" class="sendBt" @getuserinfo="onGetUserInfo">
      <image v-if="!sendModal" src="../../static/images/fabu-2.png"></image>
      <image v-if="sendModal" src="../../static/images/fabu2.png"></image>
    </button>
    <img class="qrcode_bt" :src="qrcode">
  </div>
</template>

<script>
export default {
  data () {
    return {
      sendModal: false
    }
  },
  computed: {
    wxInfo () {
      return this.$store.state.userInfo
    },
    userId () {
      return this.$store.state.openId.openId
    }
  },
  methods: {
    toSendGoods () {
      wx.navigateTo({
        url: '/pages/sendGoods/main'
      })
    },
    toSendInfo () {
      wx.navigateTo({
        url: '/pages/sendInfo/main'
      })
    },
    onGetUserInfo (e) {
      this.sendModal = !this.sendModal
      if (this.wxInfo.nickName) {
        return 0
      }
      this.$store.commit('updateIsLogin', true)
      this.$store.commit('updateUser', e.mp.detail.userInfo)
      const user = {
        nickname: this.wxInfo.nickName,
        avatar: this.wxInfo.avatarUrl,
        gender: this.wxInfo.gender,
        user_id: this.userId
      }
      wx.cloud.callFunction({
        name: 'addUser',
        data: user
      }).then(res => {
        if (res.result.data.length) {
          console.log('欢迎', res.result.data[0].nickname)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.send_modal {
    background: rgba($color: #000000, $alpha: 0.3);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    -webkit-animation-name: fadeIn; /*动画名称*/
    -webkit-animation-duration: 0.5s; /*动画持续时间*/
    -webkit-animation-iteration-count: 1; /*动画次数*/
    -webkit-animation-delay: 0s; /*延迟时间*/
    .send {
      width: 280rpx;
      height: 280rpx;
      position: fixed;
      bottom: 0;
      right: 0
    }
    span {
      display: inline-block;
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
      background: #4ddfa9;
      text-align: center;
      line-height: 80rpx;
      padding: 10rpx;
      position: absolute;
      -webkit-animation-name: fadeIn; /*动画名称*/
      -webkit-animation-duration: 0.5s; /*动画持续时间*/
      -webkit-animation-iteration-count: 1; /*动画次数*/
      -webkit-animation-delay: 0s; /*延迟时间*/
      img {
        width: 50rpx;
        height: 50rpx;
        // vertical-align: middle;
      }
      h4{
        height: 30rpx;
        line-height: 30rpx;
        color: #fff;
        font-size: 22rpx;
        margin-top: -20rpx;
      }
    }
  }
  .sendBt {
    width: 90rpx;
    height: 90rpx;
    border-radius: 50%;
    background: url('../../static/images/fabu-2.png');
    background-size: cover;
    position: fixed;
    top: 20rpx;
    right: 20rpx;
    background-color: #fff;
  }
  .active {
    background: url('../../static/images/fabu2.png');
    background-color: #fff;
    background-size: cover;
  }
  @-webkit-keyframes fadeIn {
  0% {
  opacity: 0; /*初始状态 透明度为0*/
  }
  50% {
  opacity: 0.5; /*中间状态 透明度为0*/
  }
  100% {
  opacity: 1; /*结尾状态 透明度为1*/
  }
}
</style>