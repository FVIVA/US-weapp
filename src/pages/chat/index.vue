<template>
  <div class="box">
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
      <div style="border-bottom: 1rpx rgb(249,249,249) solid;" v-if="isLogin" v-for="item in infoList" :key="item.id">
        <i-swipeout  class="info-item"  :unclosable="true">
            <view slot="content" class="info-item_content" @click="toChat(item.sender)">
              <img :src="item.sender_avatar">
              <span class="message">{{item.messageList[item.messageList.length-1].content}}</span>
              <span class="time">{{item.messageList[item.messageList.length-1].time}}</span>
            </view>
            <view slot="button" >
              <div style="background: #ed3f14;" class="info-item-bt" @click="delInfo(item)">删除</div>
            </view>
        </i-swipeout>
      </div>
      <div class="blank" v-show="blank&&isLogin">
        还没有和任何人聊天哦..<br>
        快去寻找新朋友吧<br>
        </div>
    <send></send>
    </div>
  </div>
</template>

<script>
import send from '@/components/send'
import {dateformate} from '@/utils/common'
export default {
  onShow () {
    wx.setNavigationBarTitle({title: '消息列表'})
    if (this.isLogin) {
      this.getChatList()
    }
  },
  onHide () {
    clearInterval(this.timer)
    this.timer = null
  },
  onPullDownRefresh () {
    console.log('下拉')
    this.getChatList()
  },
  components: {
    send
  },
  data () {
    return {
      infoList: [],
      timer: null,
      blank: false
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
    delInfo (item) {
      console.log(this.infoList.indexOf(item))
      this.infoList.splice(this.infoList.indexOf(item), 1)
    },
    toChat (id) {
      wx.navigateTo({
        url: `/pages/chatInfo/main?id=${id}`
      })
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
      this.getChatList()
    },
    getChatList () {
      let result = []
      wx.cloud.callFunction({
        name: 'getChatList',
        data: {
          user_id: this.userId
        }
      }).then(res => {
        result = res.result.data
        wx.stopPullDownRefresh()
        let map = {}
        let dest = []
        result.forEach(info => {
          info.time = dateformate(info.time)
          if (info.user1 !== this.userInfo.user_id) {
            if (!map[info.user1]) {
              dest.push({
                sender: info.user1,
                sender_avatar: info.user1_avatar,
                messageList: [info]
              })
              map[info.user1] = info
            } else {
              dest.forEach(v => {
                if (v.sender === info.user1) {
                  v.messageList.push(info)
                }
              })
            }
          } else {
            if (!map[info.user2]) {
              dest.push({
                sender: info.user2,
                sender_avatar: info.user2_avatar,
                messageList: [info]
              })
              map[info.user2] = info
            } else {
              dest.forEach(v => {
                if (v.sender === info.user2) {
                  v.messageList.push(info)
                }
              })
            }
          }
        })
        this.infoList = dest
        if (!this.infoList.length) {
          this.blank = true
        } else {
          this.blank = false
        }
      })
    },
    timingChat () {
      this.timer = setInterval(() => {
        this.getChatList()
      }, 1000)
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
  padding: 0px 20px;
  margin-left: 10px;
  background: #ffda00;
  margin-top: 400rpx;
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
    border-radius: 100%;
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
.blank {
  height: 100vh;
  width: 100vw;
  text-align: center;
  font-size: 24rpx;
  color: #777;
}
</style>
