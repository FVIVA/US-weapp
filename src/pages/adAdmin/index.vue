<template>
  <div class="box">
    <div class="add" @click="add">新增广告位</div>
    <div class="main">
      <i-divider v-if="blank" content="加载已经完成,没有其他数据"></i-divider>
      <div class="ad">
        <div v-for="ad in adList" class="ad__item" :key="ad.id">
          <img :src="ad.ad_url" mode="aspectFill">
          <span @click="openDel(ad)">删除</span>
        </div>
      </div>
    </div>
    <i-modal title="删除确认" :visible="delModal" @ok="delAd" @cancle="delModal = false" show-ok show-cancle>
        <view>删除后无法恢复哦</view>
    </i-modal>
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
        ad: '',
        psw: ''
      },
      lock: true,
      searchKey: '',
      adList: [],
      blank: false,
      adShow: false,
      currentad: {},
      delModal: false,
      file: ''
    }
  },
  onShow () {
    this.getAdList()
    wx.setNavigationBarTitle({title: '物品管理'})
  },
  methods: {
    getAdList () {
      wx.showLoading({
        title: '加载中'
      })
      wx.cloud.callFunction({
        name: 'getAdList'
      }).then(res => {
        wx.hideLoading()
        this.adList = res.result.data
        if (res.result.data.length === 0) {
          this.blank = true
        } else {
          this.blank = false
        }
      })
    },
    openDel (ad) {
      this.currentad = ad
      this.delModal = true
    },
    delAd () {
      const adData = {
        ad_id: this.currentad._id
      }
      console.log(adData)
      wx.cloud.callFunction({
        name: 'deleteAd',
        data: adData
      }).then(res => {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000
        })
        this.delModal = false
        this.getAdList()
      })
    },
    openDetail (ad) {
      this.adShow = true
      this.currentad = ad
    },
    add () {
      let that = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          res.tempFilePaths.forEach(file => {
            wx.showLoading({
              title: '上传中'
            })
            that.file = res.tempFilePaths[0]
            let filePath = that.file
            const name = Math.random() * 1000000
            const cloudPath = name + filePath.match(/\.[^.]+?$/)[0]
            wx.cloud.uploadFile({
              cloudPath, // 云存储图片名字
              filePath, // 临时路径
              success: res => {
                wx.cloud.callFunction({
                  name: 'addAd',
                  data: {
                    url: res.fileID
                  }
                }).then(res => {
                  console.log('[上传图片] 成功：', res)
                  that.getAdList()
                })
              },
              fail: e => {
                console.error('[上传图片] 失败：', e)
              },
              complete: () => {
                wx.hideLoading()
              }
            })
          })
        }
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
.add {
  width:40%;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  position: fixed;
  top: 20rpx;
  right: 40rpx;
  background: #000;
  border-radius: 60rpx;
  color: #fff;
  font-size: 24rpx;
}
.main {
  margin-top: 120rpx;
}
.ad {
  margin-top: 40rpx;
  padding: 0 20rpx;
  &__item {
    img {
      width: 78%;
      height: 300rpx;
    }
    span {
      width: 20%;
      height: 300rpx;
      line-height: 300rpx;
      display: inline-block;
      background: #ed3f14;
      color: #fff;
      vertical-align: top;
      // float: right;
      text-align: center;
      font-size: 24rpx;
      margin-left: 2%;
    }
  }
}
</style>
