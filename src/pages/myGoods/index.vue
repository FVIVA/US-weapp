<template>
  <div class="box">
    <img class="bg" src="../../../static/images/pesonbg.jpg">
    <div class="main">
     <i-swipeout class="goods-item" v-for="item in goodsList" :key="item.id" :unclosable="true">
        <view slot="content">
            <i-cell 
                title="点击按钮不可关闭" 
                label="侏罗纪世界主题公园及豪华度假村被失控的恐龙们摧毁已有四年">
              <img :src="item.pic[0]">
              <span>{{item.title}}</span>
            </i-cell>
        </view>
        <view slot="button" >
            <div style="background: #19be6b;" class="goods-item-bt" @click="toQrcode(item)">置换</div>
            <div style="background: #ccc;" class="goods-item-bt" @click="editGoods(item)">编辑</div>
            <div style="background: #ed3f14;" class="goods-item-bt" @click="openDel(item)">删除</div>
        </view>
    </i-swipeout>
    </div>
    <i-modal title="删除确认" :visible="delModal" @click="delGoods" @canle="delModal" show-ok show-cancle>
        <view>删除后无法恢复哦</view>
    </i-modal>
    <send></send>
  </div>
</template>

<script>
import send from '@/components/send'
export default {
  onShow () {
    wx.setNavigationBarTitle({title: '我的'})
  },
  components: {
    send
  },
  data () {
    return {
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
      goodsList: [
        {
          pic: [ 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554040104005&di=916bea5645e8c6ee2ba4a5326f757f95&imgtype=0&src=http%3A%2F%2Fimg17.3lian.com%2Fd%2Ffile%2F201701%2F23%2F896b407a549be54678caa0a81a76dfc9.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554040320786&di=3b0de58dc220ab9cde367bd4a61a39fe&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201803%2F26%2F20180326153414_MP4Xt.jpeg' ],
          title: '小清醒日系台历',
          des: '小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历',
          price: 10
        },
        {
          pic: [ 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554040104005&di=916bea5645e8c6ee2ba4a5326f757f95&imgtype=0&src=http%3A%2F%2Fimg17.3lian.com%2Fd%2Ffile%2F201701%2F23%2F896b407a549be54678caa0a81a76dfc9.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554040320786&di=3b0de58dc220ab9cde367bd4a61a39fe&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201803%2F26%2F20180326153414_MP4Xt.jpeg' ],
          title: '小清醒日系台历',
          des: '小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历',
          price: 10
        },
        {
          pic: [ 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554040104005&di=916bea5645e8c6ee2ba4a5326f757f95&imgtype=0&src=http%3A%2F%2Fimg17.3lian.com%2Fd%2Ffile%2F201701%2F23%2F896b407a549be54678caa0a81a76dfc9.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554040320786&di=3b0de58dc220ab9cde367bd4a61a39fe&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201803%2F26%2F20180326153414_MP4Xt.jpeg' ],
          title: '小清醒日系台历',
          des: '小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历',
          price: 10
        },
        {
          pic: [ 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554040104005&di=916bea5645e8c6ee2ba4a5326f757f95&imgtype=0&src=http%3A%2F%2Fimg17.3lian.com%2Fd%2Ffile%2F201701%2F23%2F896b407a549be54678caa0a81a76dfc9.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554040320786&di=3b0de58dc220ab9cde367bd4a61a39fe&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201803%2F26%2F20180326153414_MP4Xt.jpeg' ],
          title: '小清醒日系台历',
          des: '小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历小清醒日系台历',
          price: 10
        }
      ]
    }
  },
  methods: {
    editGoods (goods) {
      wx.navigateTo({
        url: `/pages/editGoods/main?id=${goods.id}`
      })
    },
    openDel (goods) {
      this.currentGoods = goods
      this.delModal = true
    },
    delGoods (detail) {
      console.log(detail)
      if (detail.index === 0) {
        this.delModal = false
      } else {
        setTimeout(() => {
          this.delModal = false
          // this.$Toast({
          //   content: '删除成功！',
          //   type: 'success'
          // })
          console.log('删除成功！')
        }, 2000)
      }
    },
    toQrcode (goods) {
      wx.navigateTo({
        url: `/pages/qrcode/main?id=${goods.id}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
  width:100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: -99;
}
.box {
  position: relative;
}
.main {
  width: 90%;
  height: auto;
  position: absolute;
  top: 20rpx;
  left: 0;
  right: 0;
  margin: auto;
  background: rgba(#fff,0.8);
  padding: 20rpx;
}
.goods-item {
  // line-height: 100rpx;
  img {
    width: 100rpx;
    height: 100rpx;
    font-size: 24rpx;
    float: left;
    margin-right: 40rpx;
  }
  span {
    display: inline-block;
    height: 100rpx;
    line-height: 100rpx;
  }
  &-bt {
    width: 100rpx;
    height: 150rpx;
    line-height: 150rpx;
    display: inline-block;
    text-align: center;
    color: #fff;
  }
}
</style>


