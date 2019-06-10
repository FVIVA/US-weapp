<template>
  <div class="box">
    <div class="head">
      <input placeholder="这是一个可以自动聚焦的input" auto-focus v-model="searchKey"/>
      <i-icon type="search" size="24" color="#000" @click="searchUser" />
    </div>
    <div class="main">
      <div @click="addModal = true" class="add">新增管理员</div>
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
    <i-modal title="新增管理员" :visible="addModal" @ok="add" @cancle="addModal = false" show-ok show-cancle>
        <view class="add-item">
          <input placeholder="账号" v-model="admin.user" />
          <input placeholder="密码" v-model="admin.psw"/>
        </view>
    </i-modal>
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
      lock: true,
      searchKey: '',
      userList: [],
      blank: false,
      admin: {
        user: '',
        psw: ''
      },
      addModal: false
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
    add () {
      wx.cloud.callFunction({
        name: 'addAdmin',
        data: this.admin
      }).then(res => {
        wx.showToast({
          title: '新增成功',
          icon: 'success',
          duration: 2000
        })
      })
    }
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
.add {
  width:40%;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  // position: fixed;
  // top: 100rpx;
  // right: 40rpx;
  margin-left: 400rpx;
  margin-bottom: 30rpx;
  background: #000;
  border-radius: 60rpx;
  color: #fff;
  font-size: 24rpx;
  z-index: 100;
}
.add-item {
  input {
    border: 2px #000 solid;
    width: 80%;
    margin: 60rpx auto;
    border-radius: 60rpx;
    font-size: 24rpx;
  }
}
</style>
