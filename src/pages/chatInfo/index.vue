<template>
  <div class="box">
    <div class="chat" v-if="infoList.length">
      <div class="chat-info" v-for="info in infoList" :key="info.id">
        <div class="chat-info__item" v-if="info.user1 === sender">
          <img style="float:left" :src="senderInfo.avatar">
          <span class="txt">{{info.content}}</span>
          <span class="time">{{info.time}}</span>
        </div>
        <div class="chat-info__item right" v-if="info.user1 === userInfo.user_id">
          <span class="txt" style="margin-right:20rpx;">{{info.content}}</span>
          <img class="right" :src="userInfo.avatar">
          <span class="time">{{info.time}}</span>
        </div>
      </div>
      <div class="send">
        <input placeholder="请输入信息内容" v-model="infoContent" auto-focus /><span @click="send">发送</span>
      </div>
    </div>
    <send></send>
  </div>
</template>

<script>
import send from '@/components/send'
import {dateformate} from '@/utils/common'
export default {
  onShow () {
    if (this.isLogin) {
      this.getChatList()
    }
    wx.showLoading({
      title: '加载中'
    })
    this.getUserInfo()
    this.timingChat()
  },
  onLoad (options) {
    this.senderId = options.id
    console.log(options.id, 'id')
  },
  onHide () {
    clearInterval(this.timer)
    this.timer = null
  },
  onReachBottom () {
    this.getChatList()
  },
  components: {
    send
  },
  data () {
    return {
      infoList: [],
      senderInfo: {},
      infoContent: '',
      timer: null,
      sendLock: true
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    userInfo () {
      return this.$store.state.userInfo
    },
    sender () {
      return this.senderId
    }
  },
  methods: {
    getUserInfo () {
      const userData = {
        user_id: this.senderId
      }
      wx.cloud.callFunction({
        name: 'getOneUser',
        data: userData
      }).then(res => {
        this.senderInfo = res.result.data[0]
        wx.setNavigationBarTitle({title: `与${this.senderInfo.nickname}聊天中`})
      })
    },
    getChatList () {
      wx.cloud.callFunction({
        name: 'getChatList',
        data: {
          user_id: this.userInfo.user_id,
          send_id: this.senderId
        }
      }).then(res => {
        this.infoList = res.result.data
        this.infoList.forEach(v => {
          v.time = dateformate(v.time)
        })
        wx.hideLoading()
      })
    },
    send () {
      if (!this.infoContent) {
        return 0
      }
      if (!this.sendLock) {
        return 0
      }
      this.sendLock = false
      wx.cloud.callFunction({
        name: 'addChat',
        data: {
          user1: this.userInfo.user_id,
          user2: this.senderId,
          user2_avatar: this.senderInfo.avatar,
          user1_avatar: this.userInfo.avatar,
          content: this.infoContent
        }
      }).then(res => {
        this.getChatList()
        this.infoContent = ''
        this.sendLock = true
      })
    },
    timingChat () {
      this.timer = setInterval(() => {
        this.getChatList()
      }, 1500)
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
.chat {
  padding: 30rpx;
  &-info {
    &__item {
      padding:20rpx;
      word-wrap: break-word;
      width: 100%;
      margin-bottom: 30rpx;
      img {
        width: 80rpx;
        height: 80rpx;
        border-radius: 100%;
      }
      span {
        display: inline-block;
      }
      .txt {
        width: 380rpx;
        padding: 20rpx;
        font-size: 28rpx;
        color: #333;
        vertical-align: top;
        margin-left: 20rpx;
        border: #888 1rpx solid;
        border-radius: 10rpx;
      }
      .time {
        font-size: 20rpx;
        color: #ccc;
      }
    }
  }
}
.send {
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 100rpx;
  text-align: center;
  background: #fff;
  input {
    width: 60%;
    height: 60rpx;
    line-height: 60rpx;
    border: #666 1px solid;
    font-size: 24rpx;
    border-radius: 3px;
    display: inline-block;
  }
  span {
    display: inline-block;
    width: 20%;
    height: 60rpx;
    line-height: 60rpx;
    border: #666 1px solid;
    font-size: 24rpx;
    vertical-align: top;
    border-radius: 3px;
    margin-right: 20rpx;
  }
}
.right {
  // float: right;
  text-align: right;
}
</style>
