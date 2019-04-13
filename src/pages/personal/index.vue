<template>
  <div class="box">
    <div class="head">
      <img src="../../../static/images/pesonbg.jpg">
    </div>
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
        <span v-if="userInfo.isAuthed" class="auth" style="border: 2px #4ddfa9 solid;">已认证</span>
        <span v-if="!userInfo.isAuthed" class="auth" style="border: 2px #ff3b53 solid;">未认证</span>
        <img :src="wxInfo.avatarUrl">
        <br>
        <span style="font-size: 28rpx; margin-right:20rpx;">{{wxInfo.nickName}}</span>
        <br>
        <span style="font-size:24rpx; color:#aaa;">
          {{userInfo.location}} | 交换{{userInfo.changeCount}}次 | {{userInfo.age}} | {{wxInfo.gender}}
        </span>
      </div>
      <i-cell-group v-if="isLogin">
        <i-cell title="我的动态" is-link url="/pages/infoDetail/main"></i-cell>
        <!-- <i-cell title="跳转到首页" is-link url="/pages/dashboard/index"></i-cell> -->
        <!-- <i-cell title="只有 footer 点击有效" is-link url="/pages/dashboard/index" only-tap-footer></i-cell> -->
        <i-cell title="我的物品" is-link url="/pages/myGoods/main"></i-cell>
        <i-cell title="学生认证" is-link url="/pages/auth/main"></i-cell>
        <i-cell title="修改资料" is-link url="/pages/data/main"></i-cell>
        <i-cell title="退出登录" @click.stop="exitLogin()"></i-cell>
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
      sendModal: false,
      userInfo: {
        userAvatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554039732317&di=1aa15529d278ce843bec980885fc161e&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2019-3%2F2019030809345562253.jpg',
        userName: '小桃',
        location: '杭州电子科技大学',
        changeCount: 0,
        age: '95后',
        gender: '男',
        isAuthed: false
      }
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    wxInfo () {
      return this.$store.state.userInfo
    }
  },
  methods: {
    toEditInfo () {},
    onGetUserInfo (e) {
      this.$store.commit('updateIsLogin', true)
      this.$store.commit('updateUser', e.mp.detail.userInfo)
    },
    exitLogin () {
      this.$store.commit('updateIsLogin', false)
      this.$store.commit('cleanUserInfo')
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
</style>


