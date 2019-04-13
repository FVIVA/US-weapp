<template>
  <div>
    <div class="head">
       <input placeholder="这是一个可以自动聚焦的input" auto-focus />
       <i-icon type="search" size="24" color="#000"/>
    </div>
    <div class="main">
      <div class="more-goods">
      <div class="more-goods__item" v-for="item in moreGoodList" :key="item.id" @click="toGoodsDetail(item.id)">
        <img class="more-goods__item_pic" :src="item.pic[0]">
        <div class="more-goods__item_price">
          <img src="/static/images/jinbi.png">
          {{item.price}}
        </div>
        <div class="more-goods__item_title">{{item.title}}</div>
      </div>
    </div>
    </div>
    <send></send>
  </div>
</template>

<script>
import send from '@/components/send'
export default {
  onShow () {
    wx.setNavigationBarTitle({title: '好物换取中'})
  },
  components: {
    send
  },
  data () {
    return {
      moreGoodList: [
        {
          userAvatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554039732317&di=1aa15529d278ce843bec980885fc161e&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2019-3%2F2019030809345562253.jpg',
          userName: '小桃',
          pic: [ 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554040104005&di=916bea5645e8c6ee2ba4a5326f757f95&imgtype=0&src=http%3A%2F%2Fimg17.3lian.com%2Fd%2Ffile%2F201701%2F23%2F896b407a549be54678caa0a81a76dfc9.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554040320786&di=3b0de58dc220ab9cde367bd4a61a39fe&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201803%2F26%2F20180326153414_MP4Xt.jpeg' ],
          title: '小清醒日系台历',
          des: '小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历',
          likeCount: 0,
          isLiked: 0,
          price: 10
        },
        {
          userAvatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554039732317&di=1aa15529d278ce843bec980885fc161e&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2019-3%2F2019030809345562253.jpg',
          userName: '小桃',
          pic: [ 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554040104005&di=916bea5645e8c6ee2ba4a5326f757f95&imgtype=0&src=http%3A%2F%2Fimg17.3lian.com%2Fd%2Ffile%2F201701%2F23%2F896b407a549be54678caa0a81a76dfc9.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554040320786&di=3b0de58dc220ab9cde367bd4a61a39fe&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201803%2F26%2F20180326153414_MP4Xt.jpeg' ],
          title: '小清醒日系台历',
          des: '小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历',
          likeCount: 0,
          isLiked: 0,
          price: 10
        },
        {
          userAvatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554039732317&di=1aa15529d278ce843bec980885fc161e&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2019-3%2F2019030809345562253.jpg',
          userName: '小桃',
          pic: [ 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554040104005&di=916bea5645e8c6ee2ba4a5326f757f95&imgtype=0&src=http%3A%2F%2Fimg17.3lian.com%2Fd%2Ffile%2F201701%2F23%2F896b407a549be54678caa0a81a76dfc9.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554040320786&di=3b0de58dc220ab9cde367bd4a61a39fe&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201803%2F26%2F20180326153414_MP4Xt.jpeg' ],
          title: '小清醒日系台历',
          des: '小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历',
          likeCount: 0,
          isLiked: 0,
          price: 10
        },
        {
          userAvatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554039732317&di=1aa15529d278ce843bec980885fc161e&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2019-3%2F2019030809345562253.jpg',
          userName: '小桃',
          pic: [ 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554040104005&di=916bea5645e8c6ee2ba4a5326f757f95&imgtype=0&src=http%3A%2F%2Fimg17.3lian.com%2Fd%2Ffile%2F201701%2F23%2F896b407a549be54678caa0a81a76dfc9.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554040320786&di=3b0de58dc220ab9cde367bd4a61a39fe&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201803%2F26%2F20180326153414_MP4Xt.jpeg' ],
          title: '小清醒日系台历',
          des: '小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历',
          likeCount: 0,
          isLiked: 0,
          price: 10
        },
        {
          userAvatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554039732317&di=1aa15529d278ce843bec980885fc161e&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2019-3%2F2019030809345562253.jpg',
          userName: '小桃',
          pic: [ 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554040104005&di=916bea5645e8c6ee2ba4a5326f757f95&imgtype=0&src=http%3A%2F%2Fimg17.3lian.com%2Fd%2Ffile%2F201701%2F23%2F896b407a549be54678caa0a81a76dfc9.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554040320786&di=3b0de58dc220ab9cde367bd4a61a39fe&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201803%2F26%2F20180326153414_MP4Xt.jpeg' ],
          title: '小清醒日系台历',
          des: '小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历',
          likeCount: 0,
          isLiked: 0,
          price: 10
        },
        {
          userAvatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554039732317&di=1aa15529d278ce843bec980885fc161e&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2019-3%2F2019030809345562253.jpg',
          userName: '小桃',
          pic: [ 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554040104005&di=916bea5645e8c6ee2ba4a5326f757f95&imgtype=0&src=http%3A%2F%2Fimg17.3lian.com%2Fd%2Ffile%2F201701%2F23%2F896b407a549be54678caa0a81a76dfc9.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554040320786&di=3b0de58dc220ab9cde367bd4a61a39fe&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201803%2F26%2F20180326153414_MP4Xt.jpeg' ],
          title: '小清醒日系台历',
          des: '小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历',
          likeCount: 0,
          isLiked: 0,
          price: 10
        }
      ],
      sendModal: false
    }
  },
  methods: {
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


