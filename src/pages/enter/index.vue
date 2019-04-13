<template>
  <div @click="toIndex">
    <img src="/static/images/enter.jpg" style="width: 100vw; height:100vh;">
  </div>
</template>

<script>
import { promisify } from '@/utils/common'
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
      // wx.navigateTo({url: '/pages/index/main'})
      wx.switchTab({url: '/pages/index/main'})
    }
  },
  created () {
    // 调取云服务接口
    wx.cloud.callFunction({ name: 'user' }).then(res => {
      // 更新store中的openId
      console.log(res)
      this.$store.commit('updateOpenId', res.result)
      return promisify('getUserInfo')
    })
      .then(res => {
      // 检验是否授权
        const authUserInfo = res.userInfo
        // console.log(authUserInfo)
        if (authUserInfo) {
          this.$store.commit('updateUserInfo', authUserInfo)
        }
      })
      .catch(err => console.error(err))
    // 操作数据库
    const db = wx.cloud.database({ env: 'us-eb3d12' })
    db.collection('us-demo').get()
      .then(res => {
        console.log(res.data)
        // 可以进行数据初始化
      })
      .cathc(console.error)
    setTimeout(() => {
      this.toIndex()
    }, 5000)
  }
}
</script>
<style lang="scss">

</style>


