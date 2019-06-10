<template>
  <div class="box">
    <swiper class="swiper" circular="true" autoplay="true" interval="5000" duration="1000">
      <block v-for="(item, index) in goodsInfo.goods_img" :index="index" :key="item.id">
          <swiper-item>
            <image @click="previewGoods" style="width: 100%;" :src="item" class="slide-image" mode="aspectFill"/>
          </swiper-item>
      </block>
    </swiper>
    <div class="user-info">
      <img :src="user.avatar" @click="toUserDetail(user.user_id)">
      <br>
      {{user.nickname}}
    </div>
    <div class="main">
      <div class="goods-info">
        <h2>{{goodsInfo.goods_name}}</h2>
        <span style="color:#888; font-size:22rpx;">发布于{{goodsInfo.create_time}}</span>
        <p class="goods-info__des">{{goodsInfo.remark}}</p>
        <div class="goods-info__foot">
          <span class="location">
            <span style="color: #888;">{{goodsInfo.price}}</span>U币
            <img src="/static/images/jinbi.png">
          </span>
          <span class="location">
            <img src="/static/images/weizhi.png"> 
            {{goodsInfo.location}}
          </span>
          <span class="like">
            <img v-if="!goodsInfo.isLiked" src="/static/images/xin.png" @click="changeState">
            <img v-else src="/static/images/xin2.png" @click="changeState">
          </span>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="likeCount">
        <span style="color: red;">{{goodsInfo.like_count}}</span>人点赞
      </div>
      <div class="more-goods">
        <div class="more-goods__title">更多好物待置换<span @click="toMore" style="font-size: 24rpx;" >more</span></div>
        
        <div class="more-goods__item" v-for="item in moreGoodList" :key="item.id">
          <img class="more-goods__item_pic" :src="item.goods_img[0]" @click="toGoodsDetail(item._id)" mode="aspectFill">
          <div class="more-goods__item_title">{{item.goods_name}}</div>
        </div>
      </div>
    </div>
    <div class="want">
      <i-button i-class="black" style="width: 400rpx;" @click="toChat" shape="circle" type="ghost" >联系物主</i-button>
      <i-button v-if="goodsInfo.state !== 1" style="width: 400rpx;" shape="circle" @click="scanCode" type="info">扫码置换</i-button>
      <i-button v-if="goodsInfo.state === 1"  style="width: 400rpx;" shape="circle">已被置换</i-button>
    </div>
  </div>
</template>

<script>
import {dateformate} from '@/utils/common'
export default {
  onLoad (options) {
    this.goodsId = options.id
  },
  onShow () {
    this.getGoodsInfo()
    wx.cloud.callFunction({ name: 'getGoodsList' }).then(res => {
      this.moreGoodList = res.result.data.slice(-6)
      console.log(res, 'goods')
    })
  },
  created () {
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  data () {
    return {
      goodsId: '',
      user: {},
      goodsInfo: {},
      moreGoodList: []
    }
  },
  methods: {
    getGoodsInfo () {
      const data = {
        _id: this.goodsId
      }
      wx.cloud.callFunction({
        name: 'getGoodsList',
        data: data
      }).then(res => {
        this.goodsInfo = res.result.data[0]
        this.goodsInfo.create_time = dateformate(this.goodsInfo.create_time)
        wx.setNavigationBarTitle({title: `${this.goodsInfo.goods_name}`})
      }).then(() => {
        const userData = {
          user_id: this.goodsInfo.user_id
        }
        wx.cloud.callFunction({
          name: 'getOneUser',
          data: userData
        }).then(res => {
          this.user = res.result.data[0]
        })
      })
    },
    changeState () {
      this.goodsInfo.isLiked = !this.goodsInfo.isLiked
    },
    handleClick () {},
    scanCode () {
      const that = this
      wx.scanCode({
        onlyFromCamera: true,
        success (res) {
          const result = JSON.parse(res.result)
          const info = {
            owner: result.user_id,
            exer: that.userInfo.user_id,
            price: result.price,
            goods_id: result.goods_id
          }
          console.log(info, 'info')
          wx.cloud.callFunction({
            name: 'exchange',
            data: info
          }).then(res => {
            console.log(res)
            wx.showToast({
              title: '置换成功',
              icon: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    previewGoods (e) {
      var current = e.target.dataset.src
      var urlsList = this.goodsInfo.goods_img
      console.log(urlsList)
      wx.previewImage({
        current: current, // 当前显示图片的http链接
        urls: urlsList// 需要预览的图片http链接列表
      })
    },
    toGoodsDetail (id) {
      wx.navigateTo({
        url: `/pages/goodsDetail/main?id=${id}`
      })
    },
    toUserDetail (id) {
      wx.navigateTo({
        url: `/pages/personIndex/main?id=${id}`
      })
    },
    toMore () {
      wx.navigateTo({
        url: '/pages/goodsList/main'
      })
    },
    toChat () {
      wx.navigateTo({
        url: `/pages/chatInfo/main?id=${this.goodsInfo.user_id}`
      })
    }
  }
}
</script>
<style lang="scss">
.swiper {
  height: 420rpx;
  color: #444;
}
.box {
  background: #f8f8f9;
}
.user-info {
  height: 200rpx;
  width: 100%;
  position: absolute;
  top: 350rpx;
  text-align: center;
  color: #ccc;
  img {
    width: 150rpx;
    height: 150rpx;
    border-radius: 50%;
  }
  // background: #fff;
}
.main {
  margin-bottom: 20rpx;
  padding: 150rpx 30rpx 0 30rpx;
  height: auto;
  overflow: hidden;
  background: #fff;
  .goods-info {
    &__des {
      margin: 20rpx 0;
      font-size: 26rpx;
      color: #aaa;
      font-weight: 300;
      line-height: 50rpx;
    }
    &__foot{
      height: 80rpx;
      line-height: 80rpx;
      border-top: 1px solid #eee;
      display: flex;
      justify-content:space-between;
    }
    .location {
      font-size: 24rpx;
      color: #444;
      img {
        margin-top: 15rpx;
        width: 50rpx;
        height: 50rpx;
      }
    }
    .like {
      img {
        margin-top: 15rpx;
        width: 50rpx;
        height: 50rpx;
      }
    }
  }
}
.footer {
  padding: 0 30rpx;
  background: #fff;
  .likeCount {
    text-align: center;
    height: 80rpx;
    line-height: 80rpx;
    font-size: 26rpx;
    border-bottom: 1px solid #eee;
  }
  .more-goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background: #fff;
    margin-bottom: 20rpx;
    &__title {
      margin: 20rpx auto;
      font-size: 26rpx;
      width: 100%;
      text-align: center;
      color: #444;
    }
    &__item{
      height: 450rpx;
      display: inline-block;
      margin-bottom: 30rpx;
      &_pic {
        width: 340rpx;
        height: 340rpx;
      }
      &_title {
        padding: 20rpx;
        font-size: 28rpx;
      }
    }
  }
}
.want {
  position: fixed;
  bottom: 50rpx;
  left: 0;
  height: 80rpx;
  width: 100%;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  color: #fff;
  button {
    width: 100rpx;
    display: inline-block;
  }
}
.black {
  background: #000 !important;
}
</style>


