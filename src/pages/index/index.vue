<template>
  <div class="enter">
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
      <div class="goods__item" v-for="item in goodList" :key="item.id">
        <div class="goods__item_head">
          <span @click="toUserDetail(item.user_id)">
            <i-avatar size="default" :src="item.user_avatar" style="margin-right:20rpx;"></i-avatar>{{item.user_name}}
          </span>
          <span class="want">我想要</span>
        </div>
        <div @click="toGoodsDetail(item._id)">
          <div v-if="item.goods_img[0]" class="goods__item_pic">
            <img :src="item.goods_img[0]" mode="aspectFill">
            <img :src="item.goods_img[1]" mode="aspectFill">
          </div>
          <div class="goods__item_title">
            {{item.goods_name}}
          </div>
          <div class="goods__item_des">
            {{item.remark}}
          </div>
        </div>
        <div class="goods__item_footer">
          <img v-if="!item.isLiked" src="/static/images/xin.png" @click="changeState(item)" mode="aspectFill">
          <img v-else src="/static/images/xin2.png" @click="changeState(item)" mode="aspectFill">
          <span>{{item.like_count}}</span>
        </div>
      </div>
    </div>
    <div class="title">校园资讯</div>
    <div class="news">
      <div class="news__item" v-for="item in newsList" :key="item.id"  @click="openDetail(item)">
        <img :src="item.news_img" mode="aspectFill">
        <div class="news__item_info">
          <div class="news__item_info_title">{{item.news_title}}</div>
          <div class="news__item_info_des">{{item.news_content}}</div>
          <div class="news__item_info_time">{{item.create_time}}</div>
        </div>
      </div>
    </div>
    <news-modal v-model="newsShow" :news="currentNews"></news-modal>
    <send @info="getGoodsList"></send>
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
  computed: {
    goodsLike () {
      return this.$store.state.goodsLike
    },
    userId () {
      return this.$store.state.openId.openId
    },
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  methods: {
    dateformate,
    openDetail (news) {
      this.newsShow = true
      this.currentNews = news
    },
    changeState (goods) {
      if (!this.userInfo.nickname) {
        wx.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 3000,
          complete: () => {
            wx.navigateTo({
              url: '/pages/personal/main'
            })
          }
        })
        return 0
      }
      const likearr = [...this.goodsLike]
      const index = this.goodsLike.indexOf(goods._id)
      if (index > -1) {
        likearr.splice(index, 1)
        goods.like_count -= 1
      } else {
        likearr.push(goods._id)
        goods.like_count += 1
      }
      this.$store.commit('updateGoodsLike', likearr)
      console.log(this.goodsLike, 'like')
      goods.isLiked = !goods.isLiked
      const data = {
        _id: goods._id,
        state: goods.isLiked,
        goodsLike: this.goodsLike,
        user_id: this.userId
      }
      wx.cloud.callFunction({
        name: 'changeGoodsLike',
        data: data
      })
      // wx.cloud.callFunction(data)
    },
    toGoodsDetail (id) {
      if (!this.userInfo.nickname) {
        wx.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 3000,
          complete: () => {
            wx.navigateTo({
              url: '/pages/personal/main'
            })
          }
        })
        return 0
      }
      wx.navigateTo({
        url: `/pages/goodsDetail/main?id=${id}`
      })
    },
    toUserDetail (id) {
      if (!this.userInfo.nickname) {
        wx.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 3000,
          complete: () => {
            wx.navigateTo({
              url: '/pages/personal/main'
            })
          }
        })
        return 0
      }
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
      console.log(this.goodsLike, 'get')
      wx.cloud.callFunction({ name: 'getGoodsList' }).then(res => {
        this.goodList = res.result.data.slice(-5).reverse()
        this.goodList.forEach(v => {
          v.create_time = dateformate(v.create_time)
          if (this.goodsLike.indexOf(v._id) > -1) {
            v.isLiked = true
            // console.log(v._id, this.goodsLike.indexOf(v._id))
          }
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
  background: #fff;
  &__item {
    border: none;
    background: #fff;
    padding: 20rpx;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    width: 85%;
    margin: 0 auto;
    margin-bottom: 20rpx;
    &_head {
      height: 80rpx;
      line-height: 60rpx;
      display: flex;
      justify-content: space-between;
      font-size: 30rpx;
      .want {
        display: inline-block;
        background: #ffda00;
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


