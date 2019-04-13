<template>
  <div class="box">
    <swiper class="swiper" circular="true" autoplay="true" interval="5000" duration="1000">
      <block v-for="(item, index) in goodsInfo.images" :index="index" :key="item.id">
          <swiper-item>
            <image style="width: 100%;" :src="item.url" class="slide-image" mode="aspectFill"/>
          </swiper-item>
      </block>
    </swiper>
    <div class="user-info">
      <img :src="userInfo.avatar">
      <br>
      {{userInfo.nickname}}
    </div>
    <div class="main">
      <div class="goods-info">
        <h2>{{goodsInfo.name}}</h2>
        <p class="goods-info__des">{{goodsInfo.des}}</p>
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
        <span style="color: red;">{{goodsInfo.likeCount}}</span>人点赞
      </div>
      <div class="more-goods">
        <div class="more-goods__title">更多好物待置换</div>
        <div class="more-goods__item" v-for="item in moreGoodList" :key="item.id">
          <img class="more-goods__item_pic" :src="item.pic[0]">
          <div class="more-goods__item_title">{{item.title}}</div>
        </div>
      </div>
    </div>
    <div class="want">
      <i-button style="width: 200rpx" bind:click="handleClick" type="success" shape="circle">联系</i-button>
      <i-button style="width: 200rpx;" type="info" shape="circle" @click="scanCode">置换</i-button>
    </div>
  </div>
</template>

<script>
export default {
  onShow () {
    wx.setNavigationBarTitle({title: `${this.goodsInfo.name}`})
  },
  data () {
    return {
      userInfo: {
        nickname: '小桃',
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554039732317&di=1aa15529d278ce843bec980885fc161e&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2019-3%2F2019030809345562253.jpg'
      },
      goodsInfo: {
        isLiked: false,
        likeCount: 0,
        location: '杭州电子科技大学',
        name: '和风樱花陶瓷碗',
        price: 10,
        des: '去年买的一组樱花碗，搬家带不走，送给本校同学去年买的一组樱花碗，搬家带不走，送给本校同学去年买的一组樱花碗，搬家带不走，送给本校同学去年买的一组樱花碗，搬家带不走，送给本校同学去年买的一组樱花碗，搬家带不走，送给本校同学',
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
      ]
    }
  },
  methods: {
    changeState () {
      this.goodsInfo.isLiked = !this.goodsInfo.isLiked
    },
    handleClick () {},
    scanCode () {
      wx.scanCode({
        onlyFromCamera: true,
        success (res) {
          console.log(res)
        }
      })
    }
  },
  created () {
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
  button {
    width: 100rpx;
    display: inline-block;
  }
}
</style>


