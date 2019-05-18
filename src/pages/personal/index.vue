<template>
  <div class="box">
    <div class="head">
      <img src="../../../static/images/pesonbg.jpg">
    </div>
    <div class="admin" @click="toAdmin">管理员入口</div>
    <div class="main">
      <dl class="ub-box z-padding-all-10-px" style="background:#fff">
        <dd class="ub-flex-1 z-font-size-18 z-color-333 ub-box ub-ver-v z-padding-h-10-px">
          <button v-if="!isLogin"
            class="loginBtn"
            lang="zh_CN"
            open-type="getUserInfo"
            @getuserinfo="onGetUserInfo">登录</button>
          <ul v-if="isLogin" class="ub-box z-margin-left-10-px ub-col">
          </ul>
        </dd>
      </dl>
      <div class="info" v-if="isLogin">
        <span v-if="userInfo.user_type === 1" class="auth" style="border: 2px #4ddfa9 solid;">已认证</span>
        <span v-if="userInfo.user_type === 0" class="auth" style="border: 2px #ff3b53 solid;">未认证</span>
        <img :src="userInfo.avatar">
        <br>
        <span style="font-size: 28rpx; margin-right:20rpx;">{{userInfo.nickname}}</span>
        <br>
        <span style="font-size:24rpx; color:#aaa;">
          {{userInfo.school || '-'}} | 交换{{userInfo.changeCount}}次 | {{userInfo.age}} | {{userInfo.gender}}
        </span>
      </div>
      <i-cell-group v-if="isLogin">
        <i-cell title="我的动态" is-link url="/pages/infoDetail/main"><i-icon type="camera" slot="icon" /></i-cell>
        <i-cell title="我的物品" is-link url="/pages/myGoods/main"><i-icon type="commodity" slot="icon" /></i-cell>
        <i-cell title="学生认证" is-link url="/pages/auth/main"><i-icon type="addressbook" slot="icon" /></i-cell>
        <i-cell title="修改资料" is-link url="/pages/data/main"><i-icon type="editor" slot="icon" /></i-cell>
        <i-cell title="退出登录" @click.stop="exitLogin()"><i-icon type="undo" slot="icon"/></i-cell>
      </i-cell-group>
    </div>
    <send></send>
  </div>
</template>

<script>
import send from '@/components/send'
export default {
  onShow () {
    wx.setNavigationBarTitle({title: '我的'})
  },
  components: {
    send
  },
  data () {
    return {
      sendModal: false
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    userInfo () {
      return this.$store.state.userInfo
    },
    userId () {
      return this.$store.state.openId.openId
    }
  },
  methods: {
    toEditInfo () {},
    onGetUserInfo (e) {
      const wxInfo = e.mp.detail.userInfo
      if (!wxInfo.nickName) {
        return 0
      }
      this.sendModal = !this.sendModal
      // console.log(this.userInfo.nickname)
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
      wx.cloud.callFunction({
        name: 'getLike',
        data: {
          user_id: this.userId
        }
      }).then(res => {
        console.log(res, 'getLike')
        this.$store.commit('updateGoodsLike', res.result.data[0].goodsLike)
      })
      this.$emit('info')
    },
    exitLogin () {
      this.$store.commit('updateIsLogin', false)
      this.$store.commit('cleanUserInfo')
      console.log(this.isLogin)
    },
    toAdmin () {
      wx.navigateTo({
        url: '/pages/login/main'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  position: relative;
}
.head {
  width:100vw;
  height: 100vh;
  img {
    height: 100%;
    width: 100%;
  }
}
.loginBtn {
  font-size: 14px;
  color: #fff;
  padding: 0px 20px;
  margin-left: 10px;
  background: #ff5722;
}
.main {
  width: 90%;
  height: auto;
  position: absolute;
  top: 120rpx;
  left: 0;
  right: 0;
  margin: auto;
  // background: rgba(#fff,0.8);
}
.info {
  text-align: center;
  background: rgba(#fff,0.8);
  margin-bottom: 20rpx;
  padding: 20rpx;
  position: relative;
  img {
    width: 150rpx;
    height: 150rpx;
    border-radius: 50%;
  }
  .auth {
    display: inline-block;
    
    height: 25rpx;
    line-height: 25rpx;
    font-size: 20rpx;
    padding: 5rpx;
    border-radius: 15rpx;
    position: absolute;
    right: 20rpx;
    top: 20rpx;
  }
}
.admin {
  height: 40rpx;
  line-height: 40rpx;
  width: 140rpx;
  border: 2px #000 solid;
  position: absolute;
  right: 20rpx;
  top: 20rpx;
  font-size: 24rpx;
  border-radius: 40rpx;
  text-align: center;
}
</style>


