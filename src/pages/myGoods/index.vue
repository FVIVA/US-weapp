<template>
  <div class="box">
    <div class="head">
      <img src="../../../static/images/pesonbg.jpg">
    </div>
    <div class="main">
      <div class="info">
        <img :src="userInfo.avatar">
        <br>
        <span style="font-size: 28rpx; margin-right:20rpx;">{{userInfo.nickname}}</span>
        <br>
        <span style="font-size:24rpx; color:#aaa;">
          {{userInfo.school || '-'}} | 交换{{userInfo.changeCount}}次 | {{userInfo.age}} | {{userInfo.gender}}
        </span>
      </div>
     <i-swipeout class="goods-item" v-for="item in goodsList" :key="item.id" :unclosable="true">
        <view slot="content" @click="toQrcode(item.qrcode)">
          <img class="goods_img" :src="item.goods_img[0]">
            <span class="goods_name">{{item.goods_name}}</span>
            <span class="goods_price">{{item.price}}</span>
        </view>
        <view slot="button" >
            <div style="background: #ccc;" class="goods-item-bt" @click="editGoods(item._id)">编辑</div>
            <div style="background: #ed3f14;" class="goods-item-bt" @click="openDel(item._id)">删除</div>
        </view>
    </i-swipeout>
    </div>
    <i-modal title="删除确认" :visible="delModal" @click="delGoods" @canle="delModal" show-ok show-cancle>
        <view>删除后无法恢复哦</view>
    </i-modal>
    <send></send>
    <div class="qrcode_modal" catchtouchmove="ture" v-if="qrcodeModal" @click="qrcodeModal = false">
      <div class="qrcode">
        <img :src="qrcode">
      </div>
    </div>
  </div>
</template>

<script>
import send from '@/components/send'
export default {
  onShow () {
    wx.setNavigationBarTitle({title: '我的'})
    this.getGoodsList()
  },
  components: {
    send
  },
  data () {
    return {
      userInfo: {},
      sendModal: false,
      delModal: false,
      currentGoods: {},
      delAction: [
        {
          name: '取消'
        },
        {
          name: '删除',
          color: '#ed3f14',
          loading: false
        }
      ],
      goodsList: [],
      qrcode: '',
      qrcodeModal: false,
      currentGoodsId: ''
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  methods: {
    getGoodsList () {
      const goodData = {
        user_id: this.userInfo.user_id
      }
      wx.cloud.callFunction({
        name: 'getGoodsList',
        data: goodData
      }).then(res => {
        this.goodsList = res.result.data
      })
    },
    editGoods (id) {
      wx.navigateTo({
        url: `/pages/editGoods/main?id=${id}`
      })
    },
    openDel (id) {
      this.delModal = true
      this.currentGoodsId = id
    },
    delGoods () {
      const goodsData = {
        goods_id: this.currentGoodsId
      }
      console.log(goodsData)
      wx.cloud.callFunction({
        name: 'deleteGoods',
        data: goodsData
      }).then(res => {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000
        })
        this.delModal = false
        this.getGoodsList()
      })
    },
    toQrcode (qc) {
      this.qrcode = qc
      this.qrcodeModal = true
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
.info {
  text-align: center;
  background: rgba(#fff,0.8);
  margin-bottom: 20rpx;
  padding: 20rpx;
  position: relative;
  img {
    width: 150rpx;
    height: 150rpx;
    border-radius: 50%;
  }
  .auth {
    display: inline-block;
    
    height: 25rpx;
    line-height: 25rpx;
    font-size: 20rpx;
    padding: 5rpx;
    border-radius: 15rpx;
    position: absolute;
    right: 20rpx;
    top: 20rpx;
  }
}
.goods-item {
  background-color: #beceeb;
  overflow: hidden;
  resize: both;
  &-bt {
    width: 150rpx;
    height: 300rpx;
    line-height: 300rpx;
    display: inline-block;
    text-align: center;
    color: #fff;
  }
}
.goods_img {
  // background-size: 100%;
  // background-position: center center;
  width: 100%;
  height: 300rpx;
  background-color: #fff;
}
.qrcode_modal {
    background: rgba($color: #000000, $alpha: 0.3);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    text-align: center;
    -webkit-animation-name: fadeIn; /*动画名称*/
    -webkit-animation-duration: 0.5s; /*动画持续时间*/
    -webkit-animation-iteration-count: 1; /*动画次数*/
    -webkit-animation-delay: 0s; /*延迟时间*/
    img {
      width: 400rpx;
      height: 400rpx;
      margin-top: 50%;
    }
  }
  @-webkit-keyframes fadeIn {
  0% {
  opacity: 0; /*初始状态 透明度为0*/
  }
  50% {
  opacity: 0.5; /*中间状态 透明度为0*/
  }
  100% {
  opacity: 1; /*结尾状态 透明度为1*/
  }
}
</style>

<style lang="scss">
.i-swipeout-item {
  padding: 0px;
}
</style>

