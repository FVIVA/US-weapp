<template>
  <div class="info">
    <!-- <i-input :value="info.txt" mode="wrapped" type="textarea" title="详细地址"   style="height: 400rpx;"/> -->
    <textarea class="info_txt" placeholder="这一刻的想法..."></textarea>
    <div class="info_img">
      <div class="info_img_item" v-for="item in pics" :key="item.id">
        <img :src="item">
      </div>
      <div @click="chooseImg" class="info_img_item" v-if="showAdd">
        <img class="add-img" src="../../../static/images/add.png">
      </div>
    </div>
    <button>发布</button>
  </div>
</template>
<script>
export default {
  onShow () {
    wx.setNavigationBarTitle({title: '发表动态'})
  },
  data () {
    return {
      info: {
        txt: '',
        pics: []
      },
      pics: [],
      showAdd: true
    }
  },
  computed: {
    picLength () {
      return this.pics.length
    }
  },
  watch: {
    picLength (newval) {
      if (newval >= 6) {
        this.showAdd = false
      }
    }
  },
  methods: {
    chooseImg () {
      let that = this
      wx.chooseImage({
        count: 6,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          console.log(res.tempFilePaths.length)
          // 把每次选择的图push进数组
          res.tempFilePaths.forEach(v => {
            if (that.pics.length >= 6) {
              return 0
            }
            that.pics.push(v)
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.info {
  padding: 20rpx;
  padding-left: 25rpx;
  &_txt {
    min-height: 400rpx;
    font-size: 28rpx;
    color: #495060;
  }
  &_img {
    height: 600rpx;
    &_item {
      height: 220rpx;
      width: 220rpx;
      border: #dddee1 solid 1rpx;
      border-radius: 5px;
      position: relative;
      display: inline-block;
      margin: 0 5rpx;
      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
      .add-img{
        width: 100rpx;
        height: 100rpx;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
      }
    }
  }
}
</style>
