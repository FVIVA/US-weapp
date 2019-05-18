<template>
  <div class="box">
    <div class="head">
      <input placeholder="这是一个可以自动聚焦的input" auto-focus v-model="searchKey"/>
      <i-icon type="search" size="24" color="#000" @click="searchUser" />
    </div>
    <div class="main">
      <i-divider v-if="blank" content="加载已经完成,没有其他数据"></i-divider>
      <div v-for="user in userList" class="user-item" :key="user.id">
        <i-card :title="user.nickname" :thumb="user.avatar">
          <view slot="content">
            昵称: {{user.nickname}},
            性别: {{user.gender}},
            积分数: {{user.intergral}},
            姓名:{{user.user_name}},
            用户类型: {{user.user_type === 1? '已认证' : '未认证'}},
            年龄: {{user.age}},
            学校: {{user.school}},
            学号: {{user.class_num}}
          </view>
          <view slot="footer"></view>
        </i-card>
      </div>
    </div>
    <drawer></drawer>
  </div>
</template>
<script>
import drawer from '../../components/drawer'
export default {
  components: {
    drawer
  },
  data () {
    return {
      login: {
        user: '',
        psw: ''
      },
      lock: true,
      searchKey: '',
      userList: [],
      blank: false
    }
  },
  onShow () {
    this.getUserList()
    wx.setNavigationBarTitle({title: '用户管理'})
  },
  methods: {
    searchUser () {
      if (!this.searchKey) {
        this.getUserList()
        return 0
      }
      const userdata = {
        nickname: this.searchKey
      }
      wx.showLoading({
        title: '搜索中'
      })
      wx.cloud.callFunction({
        name: 'searchUser',
        data: userdata
      }).then(res => {
        wx.hideLoading()
        this.userList = res.result.data
        if (res.result.data.length === 0) {
          this.blank = true
        } else {
          this.blank = false
        }
      })
    },
    getUserList () {
      wx.cloud.callFunction({
        name: 'getOneUser'
      }).then(res => {
        this.userList = res.result.data
        if (res.result.data.length === 0) {
          this.blank = true
        } else {
          this.blank = false
        }
      })
    },
    toUsersAdmin () {
      wx.navigateTo({
        url: '/pages/userAdmin/main'
      })
    },
    toAdsAdmin () {},
    toGoodsAdmin () {},
    toNewsAdmin () {}
  }
}
</script>
<style lang="scss" scoped>
.box {
  height: 100%;
  width: 100vw;
  background: #fff;
  position: relative;
}
.head {
  width:80%;
  height: 60rpx;
  text-align: center;
  padding: 20rpx 0;
  position: fixed;
  top: 0;
  right: 40rpx;
  background: rgba(255, 255, 255, 0.9);
  input {
    width: 85%;
    height: 50rpx;
    // border: 1px #000 solid;
    display: inline-block;
    vertical-align: middle; 
    font-size: 24rpx;
  }
  margin-bottom: 40rpx;
  z-index: 999;
}
.main {
  margin-top: 120rpx;
}
.user-item {
  margin-bottom: 30rpx;
}
</style>
