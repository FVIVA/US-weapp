<template>
  <div class="box">
    <!-- <div class="head">
      <img src="../../../static/images/pesonbg.jpg">
    </div> -->
    <div class="info">
      <img :src="userInfo.avatar">
      <br>
      <span style="font-size: 28rpx; margin-right:20rpx;">{{userInfo.nickname}}</span>
      <br>
      <span v-if="userInfo.user_type === 0" class="auth" style="border: 2px #4ddfa9 solid;">已认证</span>
      <span v-if="!userInfo.user_type === 1" class="auth" style="border: 2px #ff3b53 solid;">未认证</span>
    </div>
    <div class="main">
      <i-tabs :current="currentTab" @change="tabChange" color="#444444">
        <i-tab key="dynamic" title="个人主页"></i-tab>
        <i-tab key="goods" title="他的物品"></i-tab>
        <i-tab key="detail" title="详细信息"></i-tab>
      </i-tabs>
      <div v-if="currentTab === 'dynamic'" class="tabbox dynamic">
        <img v-for="(item,index) in dynamicList" :src="item.dynamic_img[0]" :key="item.id" @click="previewDynamic(item.dynamic_img[0], index)">
        <div v-if="dynamicList.length === 0" class="blank">暂无动态</div>
      </div>
      <div v-if="currentTab === 'goods'" class="tabbox goods">
        <div v-if="goodsList.length === 0"  class="blank">暂无发布的物品</div>
        <img v-for="item in goodsList" :src="item.goods_img[0] || '-'" :key="item.id" @click="toGoodsDetail(item._id)">
      </div>
      <div v-if="currentTab === 'detail'" class="tabbox detail">
        <i-row class="detail_row">
          <i-col span="8" i-class="col-class" style="color: #ccc;">昵称</i-col>
          <i-col span="16" i-class="col-class">{{userInfo.nickname}}</i-col>
        </i-row>
        <i-row class="detail_row">
          <i-col span="8" i-class="col-class" style="color: #ccc;">性别</i-col>
          <i-col span="16" i-class="col-class">{{userInfo.gender === '0' ? '男' : '女'}}</i-col>
        </i-row>
        <i-row class="detail_row">
          <i-col span="8" i-class="col-class" style="color: #ccc;">出生</i-col>
          <i-col span="16" i-class="col-class">{{userInfo.age}}年</i-col>
        </i-row>
        <i-row class="detail_row">
          <i-col span="8" i-class="col-class" style="color: #ccc;">学校</i-col>
          <i-col span="16" i-class="col-class">{{userInfo.school}}</i-col>
        </i-row>
        <i-row class="detail_row">
          <i-col span="8" i-class="col-class" style="color: #ccc;">置换次数</i-col>
          <i-col span="16" i-class="col-class">{{userInfo.changeCount}}</i-col>
        </i-row>
         <i-row class="detail_row">
          <i-col span="8" i-class="col-class" style="color: #ccc;">简介</i-col>
          <i-col span="16" i-class="col-class">{{userInfo.remark || '这人很懒，没有留下简介...'}}</i-col>
        </i-row>
      </div>
    </div>
    <div class="chat_bt" @click="handleClick">和他聊天</div>
    <send></send>
  </div>
</template>

<script>
import send from '@/components/send'
export default {
  onLoad (options) {
    this.userId = options.id
    console.log(options)
  },
  onShow () {
    this.getUserInfo()
  },
  components: {
    send
  },
  data () {
    return {
      userId: '',
      sendModal: false,
      userInfo: {},
      currentTab: 'dynamic',
      dynamicList: [],
      goodsList: [
        {
          image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554039732317&di=1aa15529d278ce843bec980885fc161e&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2019-3%2F2019030809345562253.jpg',
          content: '小猪小猪'
        },
        {
          image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554039732317&di=1aa15529d278ce843bec980885fc161e&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2019-3%2F2019030809345562253.jpg',
          content: '小猪小猪'
        },
        {
          image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554039732317&di=1aa15529d278ce843bec980885fc161e&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2019-3%2F2019030809345562253.jpg',
          content: '小猪小猪'
        },
        {
          image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554039732317&di=1aa15529d278ce843bec980885fc161e&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2019-3%2F2019030809345562253.jpg',
          content: '小猪小猪'
        },
        {
          image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554039732317&di=1aa15529d278ce843bec980885fc161e&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2019-3%2F2019030809345562253.jpg',
          content: '小猪小猪'
        },
        {
          image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554039732317&di=1aa15529d278ce843bec980885fc161e&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2019-3%2F2019030809345562253.jpg',
          content: '小猪小猪'
        },
        {
          image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554039732317&di=1aa15529d278ce843bec980885fc161e&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2019-3%2F2019030809345562253.jpg',
          content: '小猪小猪'
        },
        {
          image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554039732317&di=1aa15529d278ce843bec980885fc161e&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2019-3%2F2019030809345562253.jpg',
          content: '小猪小猪'
        }
      ]
    }
  },
  computed: {
  },
  methods: {
    getUserInfo () {
      const userData = {
        user_id: this.userId
      }
      wx.cloud.callFunction({
        name: 'getOneUser',
        data: userData
      }).then(res => {
        this.userInfo = res.result.data[0]
        wx.setNavigationBarTitle({title: `${this.userInfo.nickname}的首页`})
      }).then(() => {
        this.getGoodsList()
        this.getDynamicList()
      })
    },
    getGoodsList () {
      const goodData = {
        user_id: this.userId
      }
      wx.cloud.callFunction({
        name: 'getGoodsList',
        data: goodData
      }).then(res => {
        this.goodsList = res.result.data
      })
    },
    getDynamicList () {
      const dynamicData = {
        user_id: this.userId
      }
      wx.cloud.callFunction({
        name: 'getDynamicList',
        data: dynamicData
      }).then(res => {
        this.dynamicList = res.result.data
      })
    },
    tabChange (detail) {
      // console.log(detail)
      this.currentTab = detail.mp.detail.key
    },
    previewDynamic (pic, index) {
      var urlsList = this.dynamicList.map(v => v.dynamic_img)[index]
      wx.previewImage({
        current: pic, // 当前显示图片的http链接
        urls: urlsList// 需要预览的图片http链接列表
      })
    },
    previewGoods (e) {
      var current = e.target.dataset.src
      var urlsList = this.goodsList.map(v => v.goods_img[0])
      wx.previewImage({
        current: current, // 当前显示图片的http链接
        urls: urlsList// 需要预览的图片http链接列表
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
.box {
  position: relative;
}
.head {
  width:100vw;
  height: 100vh;
  img {
    height: 100%;
    width: 100%;
  }
}
.loginBtn {
  font-size: 14px;
  color: #fff;
  padding: 0px 20px;
  margin-left: 10px;
  background: #ff5722;
}
.main {
  width: 90%;
  height: auto;
  position: absolute;
  top: 300rpx;
  left: 0;
  right: 0;
  margin: auto;
  // background: rgba(#fff,0.8);
}
.info {
  width: 100vw;
  height: 350rpx;
  text-align: center;
  background: #ccc;
  padding: 50rpx 0;
  position: relative;
  color: #fff;
  img {
    width: 150rpx;
    height: 150rpx;
    border-radius: 50%;
  }
}
.tabbox {
  background: rgba(#fff,1);
  padding: 20rpx;
}
.dynamic {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  img {
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 5rpx;
    margin-right: 5rpx;
  }
}
.goods {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  img {
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 5rpx;
    margin-right: 5rpx;
  }
}
.detail {
  font-size: 26rpx;
  &_row {
    line-height: 80rpx;
  }
}
.chat_bt {
  position: fixed;
  bottom: 120rpx;
  width: 90%;
  left: 0;
  right: 0;
  margin: auto;
  height: 80rpx;
  text-align: center;
  background:orange;
  color: #fff;
  line-height: 80rpx;
  border-radius: 40rpx;
  font-size: 28rpx;
}
.auth {
    display: inline-block;
    
    height: 25rpx;
    line-height: 25rpx;
    font-size: 20rpx;
    padding: 5rpx;
    border-radius: 15rpx;
    position: absolute;
    right: 40rpx;
    bottom: 170rpx;
  }
.blank {
  width: 300rpx;
  height: 80rpx;
  text-align: center;
  line-height: 80rpx;
  margin: 0 auto;
  font-size: 24rpx;
}
</style>


