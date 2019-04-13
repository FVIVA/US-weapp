<template>
  <div>
    <img class="bg" src="../../../static/images/pesonbg.jpg">
    <div class="head">
       <input placeholder="这是一个可以自动聚焦的input" auto-focus />
       <i-icon type="search" size="24" color="#000"/>
    </div>
    <div class="main">
      <div class="info__item" v-for="(item,index) in infoList" :key="item.id">
        <div class="info__item_head">
          <span>
            <i-avatar size="large" :src="item.userAvatar" style="margin-right:20rpx;"></i-avatar>{{item.userName}}
          </span>
          <span class="want">{{item.time}}</span>
        </div>
        <div class="info__item_txt">{{item.txt}}</div>
        <div class="info__item_pic">
          <img v-for="(pic,picIndex) in item.pic" :src="pic" :key="pic.id">
        </div>
        <div class="info__item_tool">
          <img v-if="!item.isLiked" src="/static/images/zan.png" @click="changeState(item)">
          <img v-else src="/static/images/zan2.png" @click="changeState(item)">
          {{item.likeCount}}
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
    wx.setNavigationBarTitle({title: '广场'})
  },
  components: {
    send
  },
  data () {
    return {
      infoList: [
        {
          userAvatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554039732317&di=1aa15529d278ce843bec980885fc161e&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2019-3%2F2019030809345562253.jpg',
          userName: '小桃',
          txt: '今天天气好好',
          pic: [
            'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3071936428,416441458&fm=11&gp=0.jpg',
            'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3071936428,416441458&fm=11&gp=0.jpg',
            'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3071936428,416441458&fm=11&gp=0.jpg',
            'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3071936428,416441458&fm=11&gp=0.jpg',
            'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3071936428,416441458&fm=11&gp=0.jpg',
            'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3071936428,416441458&fm=11&gp=0.jpg'
          ],
          isLiked: false,
          likeCount: 0
        },
        {
          userAvatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554039732317&di=1aa15529d278ce843bec980885fc161e&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2019-3%2F2019030809345562253.jpg',
          userName: '小桃',
          txt: '今天天气好好',
          pic: [
            'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3071936428,416441458&fm=11&gp=0.jpg',
            'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3071936428,416441458&fm=11&gp=0.jpg',
            'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3071936428,416441458&fm=11&gp=0.jpg',
            'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3071936428,416441458&fm=11&gp=0.jpg',
            'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3071936428,416441458&fm=11&gp=0.jpg',
            'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3071936428,416441458&fm=11&gp=0.jpg'
          ],
          isLiked: false,
          likeCount: 0
        }
      ],
      sendModal: false
    }
  },
  methods: {
    changeState (info) {
      info.isLiked = !info.isLiked
      if (info.isLiked) {
        info.likeCount++
      } else {
        info.likeCount--
      }
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
  background: rgba(#fff,0.8);
}
.info__item {
  padding: 20rpx;
  &_head {
    font-size: 28rpx;
    margin-bottom: 30rpx;
  }
  &_txt {
    font-size: 24rpx;
    margin-bottom: 20rpx;
  }
  &_pic {
    img {
      width: 210rpx;
      height: 210rpx;
      margin: 0 10rpx 10rpx 10rpx;
      border-radius: 3px;
    }
  }
  &_tool {
    text-align: right;
    font-size: 22rpx;
    color: #80848f;
    margin-right: 20rpx;

    img {
      width: 40rpx;
      height: 40rpx;
      border-radius: 5px;
    }
  }
}
</style>


