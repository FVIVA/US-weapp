<template>
  <div class="box">
    <img class="bg" src="../../../static/images/pesonbg.jpg">
    <div class="main">
      <div class="info_item" v-for="(item,itemindex) in infoList" :key="item.itemindex">
        <span class="point"></span>
        <img class="delBt" src="../../../static/images/shanchu.png">
        <div class="info_item_time">{{item.time}}</div>
        <div class="info_item_des">{{item.des}}</div>
        <div class="info_item_pic">
          <img v-for="(pic,picindex) in item.pic" :key="pic.picindex" :src="pic">
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
    wx.setNavigationBarTitle({title: '我的'})
  },
  components: {
    send
  },
  data () {
    return {
      sendModal: false,
      infoList: [
        {
          des: '我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪',
          time: '2019.4.9',
          pic: [
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554039732317&di=1aa15529d278ce843bec980885fc161e&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2019-3%2F2019030809345562253.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554039732317&di=1aa15529d278ce843bec980885fc161e&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2019-3%2F2019030809345562253.jpg'
          ]
        },
        {
          des: '我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪',
          time: '2019.4.9',
          pic: [
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554039732317&di=1aa15529d278ce843bec980885fc161e&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2019-3%2F2019030809345562253.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554039732317&di=1aa15529d278ce843bec980885fc161e&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2019-3%2F2019030809345562253.jpg'
          ]
        },
        {
          des: '我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪我是猪',
          time: '2019.4.9',
          pic: [
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554039732317&di=1aa15529d278ce843bec980885fc161e&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2019-3%2F2019030809345562253.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554039732317&di=1aa15529d278ce843bec980885fc161e&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2019-3%2F2019030809345562253.jpg'
          ]
        }
      ]
    }
  },
  methods: {
    toEditInfo () {}
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
.info_item {
  border-left: 3px #80848f solid;
  padding: 20rpx;
  position: relative;
  .point {
    display: inline-block;
    width: 30rpx;
    height: 30rpx;
    background: #80848f;
    border-radius: 50%;
    position: absolute;
    left: -17rpx;
    top: 20rpx;
  }
  &_time {
    color: #80848f;
    font-size: 24rpx;
  }
  .delBt {
    position: absolute;
    right: 0;
    top:  10rpx;
    width: 40rpx;
    height: 40rpx;
  }
  &_des {
    color: #495060;
    font-size: 26rpx;
    line-height: 45rpx;
  }
  &_pic {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    img {
      width: 400rpx;
      height: 400rpx;
      border-radius: 5px;
      margin-bottom: 20rpx;
    }
  }
  
}
</style>


