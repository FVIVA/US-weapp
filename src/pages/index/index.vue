<template>
  <div class="enter">
    <img class="bg" src="../../../static/images/pesonbg.jpg">
    <swiper class="swiper" autoplay="true" indicator-dots="true" interval="5000" duration="1000">
      <block v-for="(item, index) in goodsInfo.images" :index="index" :key="item.id">
          <swiper-item>
            <image style="width: 100%;" :src="item.url" class="slide-image" mode="aspectFill"/>
          </swiper-item>
      </block>
    </swiper>
    <div class="goods">
      <div class="goods__item" v-for="item in goodList" :key="item.id" @click="toGoodsDetail(item.id)">
        <div class="goods__item_head">
          <span>
            <i-avatar size="default" :src="item.userAvatar" style="margin-right:20rpx;"></i-avatar>{{item.userName}}
          </span>
          <span class="want">我想要</span>
        </div>
        <div class="goods__item_pic">
          <img :src="item.pic[0]">
          <img :src="item.pic[1]">
        </div>
        <div class="goods__item_title">
          {{item.title}}
        </div>
        <div class="goods__item_des">
          {{item.des}}
        </div>
        <div class="goods__item_footer">
          <img v-if="!item.isLiked" src="/static/images/xin.png" @click="changeState(item)">
          <img v-else src="/static/images/xin2.png" @click="changeState(item)">
          <span>{{item.likeCount}}</span>
        </div>
      </div>
    </div>
    <div class="title">
      <span>好物换取中</span>
      <span @click="toMore" style="font-size: 24rpx;" >more</span>
    </div>
    <div class="more-goods">
      <div class="more-goods__item" v-for="item in moreGoodList" :key="item.id" @click="toGoodsDetail(item.id)">
        <img class="more-goods__item_pic" :src="item.pic[0]">
        <div class="more-goods__item_title">{{item.title}}</div>
      </div>
    </div>
    <div class="title">校园资讯</div>
    <div class="news">
      <div class="news__item" v-for="item in newList" :key="item.id"  @click="openDetail(item)">
        <img :src="item.pic">
        <div class="news__item_info">
          <div class="news__item_info_title">{{item.title}}</div>
          <div class="news__item_info_des">{{item.des}}</div>
          <div class="news__item_info_time">{{item.time}}</div>
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
export default {
  onShow () {
    wx.setNavigationBarTitle({title: '首页'})
  },
  components: {
    NewsModal,
    send
  },
  data () {
    return {
      currentNews: {},
      newsShow: false,
      goodsInfo: {
        images: [
          {
            url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3071936428,416441458&fm=11&gp=0.jpg'
          },
          {
            url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=30686527,2552501798&fm=26&gp=0.jpg'
          },
          {
            url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2191757348,1263564221&fm=26&gp=0.jpg'
          },
          {
            url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=626573449,3602848114&fm=26&gp=0.jpg'
          },
          {
            url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3144994808,2728675571&fm=26&gp=0.jpg'
          },
          {
            url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3680688129,3013275455&fm=26&gp=0.jpg'
          }
        ]
      },
      goodList: [
        {
          userAvatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554039732317&di=1aa15529d278ce843bec980885fc161e&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2019-3%2F2019030809345562253.jpg',
          userName: '小桃',
          pic: [ 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554040104005&di=916bea5645e8c6ee2ba4a5326f757f95&imgtype=0&src=http%3A%2F%2Fimg17.3lian.com%2Fd%2Ffile%2F201701%2F23%2F896b407a549be54678caa0a81a76dfc9.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554040320786&di=3b0de58dc220ab9cde367bd4a61a39fe&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201803%2F26%2F20180326153414_MP4Xt.jpeg' ],
          title: '小清醒日系台历',
          des: '小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历',
          likeCount: 0,
          isLiked: false,
          id: 0
        },
        {
          userAvatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554039732317&di=1aa15529d278ce843bec980885fc161e&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2019-3%2F2019030809345562253.jpg',
          userName: '小桃',
          pic: [ 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3071936428,416441458&fm=11&gp=0.jpg', 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3071936428,416441458&fm=11&gp=0.jpg' ],
          title: '小清醒日系台历',
          des: '小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历',
          likeCount: 0,
          isLiked: true,
          id: 1
        }
      ],
      moreGoodList: [
        {
          userAvatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554039732317&di=1aa15529d278ce843bec980885fc161e&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2019-3%2F2019030809345562253.jpg',
          userName: '小桃',
          pic: [ 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554040104005&di=916bea5645e8c6ee2ba4a5326f757f95&imgtype=0&src=http%3A%2F%2Fimg17.3lian.com%2Fd%2Ffile%2F201701%2F23%2F896b407a549be54678caa0a81a76dfc9.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554040320786&di=3b0de58dc220ab9cde367bd4a61a39fe&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201803%2F26%2F20180326153414_MP4Xt.jpeg' ],
          title: '小清醒日系台历',
          des: '小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历',
          likeCount: 0,
          isLiked: 0
        },
        {
          userAvatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554039732317&di=1aa15529d278ce843bec980885fc161e&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2019-3%2F2019030809345562253.jpg',
          userName: '小桃',
          pic: [ 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3071936428,416441458&fm=11&gp=0.jpg', 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3071936428,416441458&fm=11&gp=0.jpg' ],
          title: '小清醒日系台历',
          des: '小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历',
          likeCount: 0,
          isLiked: 1
        },
        {
          userAvatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554039732317&di=1aa15529d278ce843bec980885fc161e&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2019-3%2F2019030809345562253.jpg',
          userName: '小桃',
          pic: [ 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554040104005&di=916bea5645e8c6ee2ba4a5326f757f95&imgtype=0&src=http%3A%2F%2Fimg17.3lian.com%2Fd%2Ffile%2F201701%2F23%2F896b407a549be54678caa0a81a76dfc9.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554040320786&di=3b0de58dc220ab9cde367bd4a61a39fe&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201803%2F26%2F20180326153414_MP4Xt.jpeg' ],
          title: '小清醒日系台历',
          des: '小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历',
          likeCount: 0,
          isLiked: 0
        },
        {
          userAvatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554039732317&di=1aa15529d278ce843bec980885fc161e&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2019-3%2F2019030809345562253.jpg',
          userName: '小桃',
          pic: [ 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3071936428,416441458&fm=11&gp=0.jpg', 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3071936428,416441458&fm=11&gp=0.jpg' ],
          title: '小清醒日系台历',
          des: '小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历',
          likeCount: 0,
          isLiked: 1
        }
      ],
      newList: [
        {
          pic: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3071936428,416441458&fm=11&gp=0.jpg',
          title: '小清醒日系台历',
          des: '小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历',
          time: '2019.3.31'
        },
        {
          pic: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3071936428,416441458&fm=11&gp=0.jpg',
          title: '小清醒日系台历',
          des: '小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历',
          time: '2019.3.31'
        },
        {
          pic: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3071936428,416441458&fm=11&gp=0.jpg',
          title: '小清醒日系台历',
          des: '小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历',
          time: '2019.3.31'
        }
      ]
    }
  },
  methods: {
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
    toMore () {
      wx.navigateTo({
        url: '/pages/goodsList/main'
      })
    }
  },

  created () {
    // setTimeout(() => {
    //   this.$router.push('')
    // }, 2000)
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
  height: auto;
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


