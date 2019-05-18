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
      <div>
        <i-swipeout v-if="isLogin" class="info-item" v-for="item in infoList" :key="item.id" :unclosable="true">
          <view slot="content" class="info-item_content">
            <img :src="item.send_avatar">
            <span class="message">{{item.messageList[0].content}}</span>
            <span class="time">{{item.messageList[0].time}}</span>
          </view>
          <view slot="button" >
            <div style="background: #ed3f14;" class="info-item-bt" @click="delInfo(item._id)">删除</div>
          </view>
        </i-swipeout>
      </div>
      
    </div>
    <send></send>
  </div>
</template>

<script>
import send from '@/components/send'
export default {
  onShow () {
    wx.setNavigationBarTitle({title: '消息列表'})
  },
  components: {
    send
  },
  data () {
    return {
      infoList: [
        {
          send_avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1705456338,1503933498&fm=27&gp=0.jpg',
          messageList: [
            {
              content: '你好你好你好你好你好你好你好你好你好你好',
              time: '2018年3月4日 23:33:02'
            }
          ]
        },
        {
          send_avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1705456338,1503933498&fm=27&gp=0.jpg',
          messageList: [
            {
              content: '你好你好你好你好你好你好你好你好你好你好',
              time: '2018年3月4日 23:33:02'
            }
          ]
        },
        {
          send_avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1705456338,1503933498&fm=27&gp=0.jpg',
          messageList: [
            {
              content: '你好你好你好你好你好你好你好你好你好你好',
              time: '2018年3月4日 23:33:02'
            }
          ]
        },
        {
          send_avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1705456338,1503933498&fm=27&gp=0.jpg',
          messageList: [
            {
              content: '你好你好你好你好你好你好你好你好你好你好',
              time: '2018年3月4日 23:33:02'
            }
          ]
        }
      ]
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
    delInfo () {

    },
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
.info-item {
  background-color: #beceeb;
  overflow: hidden;
  resize: both;
  height: 100rpx;
  line-height: 100rpx;
  width: 100%;
  &_content {
    height: 100%;
    // line-height: 120rpx;
  }
  img {
    width: 100rpx;
    height: 100rpx;
  }
  &-bt {
    width: 100%;
    height: 200rpx;
    line-height: 200rpx;
    display: inline-block;
    text-align: center;
    color: #fff;
  }
  span {
    display: inline-block;
    height: 100rpx;
    line-height: 100rpx;
  }
  .message {
    width: 200rpx;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    margin-left: 30rpx;
  }
  .time {
    width: 40%;
    font-size: 20rpx;
    color: #ccc;
    float: right;
    text-align: right;
  }
}
</style>
