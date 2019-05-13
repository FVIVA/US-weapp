<template>
  <div class="enter">
    <img class="bg" src="../../../static/images/pesonbg.jpg">
    <swiper class="swiper" autoplay="true" indicator-dots="true" interval="5000" duration="1000">
      <block v-for="(item, index) in adList" :index="index" :key="item.id">
          <swiper-item>
            <image style="width: 100%;" :src="item.ad_url" class="slide-image" mode="aspectFill"/>
          </swiper-item>
      </block>
    </swiper>
    <div class="goods">
      <div class="title">
        <span>好物换取中</span>
        <span @click="toMore" style="font-size: 24rpx;" >more</span>
      </div>
      <div class="goods__item" v-for="item in goodList" :key="item.id" @click="toGoodsDetail(item._id)">
        <div class="goods__item_head">
          <span @click="toUserDetail(item.user_id)">
            <i-avatar size="default" :src="item.user_avatar" style="margin-right:20rpx;"></i-avatar>{{item.user_name}}
          </span>s
          <span class="want">我想要</span>
        </div>
        <div v-if="item.goods_img[0]" class="goods__item_pic">
          <img :src="item.goods_img[0]">
          <img :src="item.goods_img[1]">
        </div>
        <div class="goods__item_title">
          {{item.goods_name}}
        </div>
        <div class="goods__item_des">
          {{item.remark}}
        </div>
        <div class="goods__item_footer">
          <img v-if="!item.isLiked" src="/static/images/xin.png" @click="changeState(item)">
          <img v-else src="/static/images/xin2.png" @click="changeState(item)">
          <span>{{item.like_count}}</span>
        </div>
      </div>
    </div>
    <div class="title">校园资讯</div>
    <div class="news">
      <div class="news__item" v-for="item in newsList" :key="item.id"  @click="openDetail(item)">
        <img :src="item.news_img">
        <div class="news__item_info">
          <div class="news__item_info_title">{{item.news_title}}</div>
          <div class="news__item_info_des">{{item.news_content}}</div>
          <div class="news__item_info_time">{{item.create_time}}</div>
        </div>
      </div>
    </div>
    <news-modal v-model="newsShow" :news="currentNews"></news-modal>
    <send></send>
  </div>
</template>

<script>
import NewsModal from '../../components/NewsModal'
import send from '@/components/send'
import {dateformate} from '@/utils/common'
export default {
  onShow () {
    wx.setNavigationBarTitle({title: '首页'})
    this.getGoodsList()
    this.getAdList()
    this.getNewsList()
  },
  components: {
    NewsModal,
    send
  },
  data () {
    return {
      currentNews: {},
      newsShow: false,
      adList: [],
      goodList: [],
      newsList: []
    }
  },
  methods: {
    dateformate,
    openDetail (news) {
      this.newsShow = true
      this.currentNews = news
    },
    changeState (goods) {
      goods.isLiked = !goods.isLiked
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
    getGoodsList () {
      wx.cloud.callFunction({ name: 'getGoodsList' }).then(res => {
        this.goodList = res.result.data.slice(-5).reverse()
        this.goodList.forEach(v => {
          v.create_time = dateformate(v.create_time)
        })
      })
    },
    getAdList () {
      wx.cloud.callFunction({ name: 'getAdList' }).then(res => {
        this.adList = res.result.data
      })
    },
    getNewsList () {
      wx.cloud.callFunction({ name: 'getNewsList' }).then(res => {
        this.newsList = res.result.data
        this.newsList.forEach(v => {
          v.create_time = dateformate(v.create_time)
        })
      })
    }
  },
  created () {
  }
}
</script>

<style lang="scss">
.bg {
  width:100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: -99;
}
.enter {
  background: rgba(#fff,0.6);
  color: #444;
}
.swiper {
  height: 400rpx;
}
.goods {
  // max-height: 300vh;
  // overflow: hidden;
  margin-top: 30rpx;
  &__item {
    border: none;
    background: #fff;
    padding: 20rpx;
    margin-bottom: 20rpx;
    &_head {
      height: 80rpx;
      line-height: 60rpx;
      display: flex;
      justify-content: space-between;
      font-size: 30rpx;
      .want {
        display: inline-block;
        border: #8adeab 2rpx solid;
        color: #8adeab;
        font-size: 14px;
        border-radius: 30rpx;
        height: 60rpx;
        line-height: 60rpx;
        padding: 0 30rpx;
      }
      
    }
    &_pic{
      display: flex;
      justify-content: space-between;
      img {
        width: 350rpx;
        height: 260rpx;
        border-radius: 5px;
      }
    } 
    &_title {
      margin-top: 30rpx;
    }
    &_des {
      font-size: 26rpx;
      margin-top: 20rpx;
      color: #80848f;
      font-weight: 300;
    }
    &_footer {
      display: flex;
      justify-content: flex-end;
      font-size: 24rpx;
      line-height: 70rpx;
      color: #aaa;
      font-weight: 300;
      img {
        width: 50rpx;
        height: 50rpx;
        border-radius: 5px;
      }
    }
  }
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
    border: #dddee1 1rpx solid;
    border-radius: 0 0 10rpx 10rpx;
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
    }
  }
}
.title {
  background: #fff;
  padding: 20rpx;
  display: flex;
  justify-content: space-between;
  span {
    display: inline-block;
  }
}
.news__item {
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 20rpx;
  img {
    width: 250rpx;
    height: 200rpx;
    border-radius: 5px;
  }
  &_info {
    // float: left;
    width: 450rpx;
    &_title {
      font-size: 36rpx;
    }
    &_des {
      font-size: 26rpx;
      margin-top: 20rpx;
      color: #80848f;
      font-weight: 300;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    &_time {
      line-height: 80rpx;
      font-size: 24rpx;
      color: #bbbec4;

    }
  }
}
</style>


