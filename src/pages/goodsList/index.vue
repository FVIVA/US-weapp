<template>
  <div>
    <div class="head">
       <input placeholder="这是一个可以自动聚焦的input" auto-focus v-model="searchKey" />
       <i-icon type="search" size="24" color="#000" @click="searchGoods"/>
    </div>
    <div class="main">
      <i-divider v-if="blank" content="加载已经完成,没有其他数据"></i-divider>
      <div class="more-goods">
      <div class="more-goods__item" v-for="item in moreGoodList" :key="item.id" @click="toGoodsDetail(item._id)">
        <img class="more-goods__item_pic" :src="item.goods_img[0]">
        <div class="more-goods__item_price">
          <img src="/static/images/jinbi.png">
          {{item.price}}
        </div>
        <div class="more-goods__item_title">{{item.goods_name}}</div>
      </div>
    </div>
    </div>
    <send></send>
  </div>
</template>

<script>
import send from '@/components/send'
import { shuffle } from '@/utils/common'
export default {
  onShow () {
    wx.setNavigationBarTitle({title: '好物换取中'})
    this.getGoodsList()
  },
  components: {
    send
  },
  data () {
    return {
      moreGoodList: [],
      sendModal: false,
      searchKey: '',
      blank: false
    }
  },
  created () {
  },
  methods: {
    searchGoods () {
      if (!this.searchKey) {
        this.getGoodsList()
        return 0
      }
      wx.showLoading({
        title: '搜索中'
      })
      const goodsdata = {
        goods_name: this.searchKey
      }
      wx.cloud.callFunction({
        name: 'searchGoods',
        data: goodsdata
      }).then(res => {
        wx.hideLoading()
        this.moreGoodList = res.result.data
        if (res.result.data.length === 0) {
          this.blank = true
        } else {
          this.blank = false
        }
      })
    },
    getGoodsList () {
      wx.cloud.callFunction({ name: 'getGoodsList' }).then(res => {
        this.moreGoodList = shuffle(res.result.data)
        if (res.result.data.length === 0) {
          this.blank = true
        } else {
          this.blank = false
        }
      })
    },
    toGoodsDetail (id) {
      wx.navigateTo({
        url: `/pages/goodsDetail/main?id=${id}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.head {
  width:100%;
  height: 60rpx;
  text-align: center;
  padding: 20rpx 0;
  position: fixed;
  top: 0;
  background: rgba(255, 255, 255, 0.9);
  input {
    width: 85%;
    height: 50rpx;
    // border: 1px #000 solid;
    display: inline-block;
    vertical-align: middle; 
    font-size: 24rpx;
  }
}
.main {
  height: atuo;
  margin-top: 100rpx;
}
.more-goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background: #fff;
  padding: 20rpx;
  margin-bottom: 20rpx;
  &__item{
    height: 450rpx;
    width: 345rpx;
    display: inline-block;
    margin-bottom: 30rpx;
    border-radius: 5px;
    &_pic {
      width: 345rpx;
      height: 345rpx;
      border-radius: 5px;
    }
    &_title {
      padding: 20rpx;
      font-size: 30rpx;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap
    }
    &_price {
      font-size: 24rpx;
      color: #888;
      height: 40rpx;
      line-height: 40rpx;
      img {
        width:40rpx;
        height: 40rpx;
      }
    }
  }
}
</style>


