<template>
  <div @click="toIndex">
    <img src="/static/images/enter.jpg" style="width: 100vw; height:100vh;">
  </div>
</template>

<script>
export default {
  onShow () {
    wx.setNavigationBarTitle({title: 'US'})
  },
  data () {
    return {
    }
  },
  methods: {
    toIndex () {
      // const that = this
      // wx.navigateTo({url: '/pages/index/main'})
      wx.switchTab({url: '/pages/index/main'})
      // wx.getUserInfo({
      //   success (res) {
      //     that.$store.commit('updateUser', res.userInfo)
      //     that.$store.commit('updateIsLogin', true)
      //   }
      // })
    }
  },
  created () {
    // 调取云服务接口
    wx.cloud.callFunction({ name: 'user' }).then(res => {
      // 更新store中的openId
      // console.log(res)
      this.$store.commit('updateOpenId', res.result)
    })
  }
}
</script>
<style lang="scss">

</style>


