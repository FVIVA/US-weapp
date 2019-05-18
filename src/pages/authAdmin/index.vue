<template>
  <div class="box">
    <div class="head">
      <input placeholder="这是一个可以自动聚焦的input" auto-focus v-model="searchKey"/>
      <i-icon type="search" size="24" color="#000" @click="getAuthList" />
    </div>
    <div class="main">
      <i-divider v-if="blank" content="加载已经完成,没有其他数据"></i-divider>
      <div v-for="user in userList" class="user-item" :key="user.id">
        <i-card :title="user.user_name">
          <view slot="content">
            姓名:{{user.user_name}},
            学校: {{user.school}},
            班级号: {{user.class_num}},
            学号: {{user.study_num}},
          </view>
          <view slot="footer">
            <i-icon type="right" size="30" color="#19be6b" @click="pass(user.user_id)"/>
            <i-icon type="close" size="26" color="#ed3f14" @click="refuse(user.user_id)" />
          </view>
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
    this.getAuthList()
    wx.setNavigationBarTitle({title: '学生认证'})
  },
  methods: {
    getAuthList () {
      const userdata = {
        user_name: this.searchKey
      }
      wx.showLoading({
        title: '加载中'
      })
      wx.cloud.callFunction({
        name: 'getAuthList',
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
    pass (id) {
      wx.cloud.callFunction({
        name: 'changeAuth',
        data: {
          pass: true,
          user_id: id
        }
      }).then(res => {
        this.getAuthList()
      })
    },
    refuse () {

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
</style>
