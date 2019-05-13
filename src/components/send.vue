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
      <button open-type="getUserInfo" class="sendBt" @getuserinfo="onGetUserInfo" :class="{ active: sendModal }"></button>
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
    userInfo () {
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
      const wxInfo = e.mp.detail.userInfo
      this.sendModal = !this.sendModal
      if (this.userInfo.nickname) {
        return 0
      }
      const user = {
        nickname: wxInfo.nickName,
        avatar: wxInfo.avatarUrl,
        gender: wxInfo.gender,
        user_id: this.userId
      }
      wx.cloud.callFunction({
        name: 'addUser',
        data: user
      }).then(res => {
        if (res.result.data.length) {
          console.log('欢迎', res.result.data[0].nickname)
          this.$store.commit('updateIsLogin', true)
          this.$store.commit('updateUser', res.result.data[0])
          console.log(this.userInfo)
        } else {
          console.log('添加新用户')
          const userInfo = {
            nickname: wxInfo.nickName,
            avatar: wxInfo.avatarUrl,
            gender: wxInfo.gender,
            intergral: 100,
            user_id: this.userId,
            user_name: '',
            user_type: 0,
            age: 0
          }
          this.$store.commit('updateIsLogin', true)
          this.$store.commit('updateUser', userInfo)
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
    bottom: 20rpx;
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