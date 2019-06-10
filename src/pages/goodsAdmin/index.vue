<template>
  <div class="box">
    <div class="head">
      <input placeholder="这是一个可以自动聚焦的input" auto-focus v-model="searchKey"/>
      <i-icon type="search" size="24" color="#000" @click="getAuthList" />
    </div>
    <div class="main">
      <i-divider v-if="blank" content="加载已经完成,没有其他数据"></i-divider>
      <div class="more-goods">
        <div v-for="goods in goodsList" class="goods-item more-goods__item" :key="goods.id" @click="openDetail(goods)">
          <img class="more-goods__item_pic" :src="goods.goods_img[0]" mode="aspectFill">
          <div class="more-goods__item_title">{{goods.goods_name}}</div>
        </div>
      </div>
    </div>
    <drawer></drawer>
    <goods-modal v-model="goodsShow" :goods="currentGoods" @delete="getAuthList"></goods-modal>
  </div>
</template>
<script>
import drawer from '../../components/drawer'
import goodsModal from '../../components/goodsModal'
export default {
  components: {
    drawer,
    goodsModal
  },
  data () {
    return {
      login: {
        goods: '',
        psw: ''
      },
      lock: true,
      searchKey: '',
      goodsList: [],
      blank: false,
      goodsShow: false,
      currentGoods: {}
    }
  },
  onShow () {
    this.getAuthList()
    wx.setNavigationBarTitle({title: '物品管理'})
  },
  methods: {
    getAuthList () {
      const goodsdata = {
        goods_name: this.searchKey
      }
      wx.showLoading({
        title: '加载中'
      })
      wx.cloud.callFunction({
        name: 'getGoodsList',
        data: goodsdata
      }).then(res => {
        wx.hideLoading()
        this.goodsList = res.result.data
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
          goods_id: id
        }
      }).then(res => {
        this.getAuthList()
      })
    },
    refuse () {

    },
    openDetail (goods) {
      this.goodsShow = true
      this.currentGoods = goods
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
.goods-item {
  margin-bottom: 30rpx;
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
