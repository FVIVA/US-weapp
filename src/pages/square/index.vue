<template>
  <div>
    <img class="bg" src="../../../static/images/pesonbg.jpg">
    <div class="head">
       <input placeholder="这是一个可以自动聚焦的input" auto-focus v-model="searchKey"/>
       <i-icon type="search" size="24" color="#000" @click="searchDynamic" />
    </div>
    <div class="main">
      <div class="info__item" v-for="(item,index) in dynamicList" :key="item.id">
        <div class="info__item_head">
          <span>
            <i-avatar size="large" :src="item.avatar" style="margin-right:20rpx;" @click="toUserDetail(item.user_id)"></i-avatar>{{item.nickname}}
          </span>
          <span class="time">{{item.create_time}}</span>
        </div>
        <div class="info__item_txt">{{item.dynamic_content}}</div>
         <div class="info__item_pic">
          <!-- <div class="info__pic_item"> -->
            <img v-for="(pic,picIndex) in item.dynamic_img" :src="pic" :key="pic.id" @click="previewDynamic(pic,index)">
          <!-- </div> -->
         </div>
        <div class="info__item_tool">
          <img v-if="!item.isLiked" src="/static/images/zan.png" @click="changeState(item)">
          <img v-else src="/static/images/zan2.png" @click="changeState(item)">
          {{item.like_count}}
        </div>
      </div>
    </div>
    <send></send>
  </div>
</template>

<script>
import send from '@/components/send'
import {dateformate} from '@/utils/common'
export default {
  onShow () {
    wx.setNavigationBarTitle({title: '广场'})
    this.getDynamicList()
    this.sendModal = false
  },
  components: {
    send
  },

  data () {
    return {
      dynamicList: [],
      sendModal: false,
      searchKey: ''
    }
  },
  methods: {
    time (date) {
      return dateformate(date)
    },
    changeState (info) {
      info.isLiked = !info.isLiked
      if (info.isLiked) {
        info.likeCount++
      } else {
        info.likeCount--
      }
    },
    searchDynamic () {
      if (!this.searchKey) {
        this.getDynamicList()
        return 0
      }
      const dynamicdata = {
        dynamic_content: this.searchKey
      }
      wx.cloud.callFunction({
        name: 'searchDynamic',
        data: dynamicdata
      }).then(res => {
        console.log(res, 'as')
        this.dynamicList = res.result.data.reverse()
      })
    },
    getDynamicList () {
      // const dynamicdata = {
      //   dynamic_content: this.searchKey
      // }
      wx.cloud.callFunction({
        name: 'getDynamicList'
      }).then(res => {
        this.dynamicList = res.result.data.reverse()
        this.dynamicList.forEach(v => {
          v.create_time = dateformate(v.create_time)
        })
      })
    },
    toUserDetail (id) {
      wx.navigateTo({
        url: `/pages/personIndex/main?id=${id}`
      })
    },
    previewDynamic (pic, index) {
      var urlsList = this.dynamicList.map(v => v.dynamic_img)[index]
      wx.previewImage({
        current: pic, // 当前显示图片的http链接
        urls: urlsList// 需要预览的图片http链接列表
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
    .time {
      color: #ccc;
      font-size: 22rpx;
    }
  }
  &_txt {
    font-size: 24rpx;
    margin-bottom: 20rpx;
    padding-right: 40rpx;
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
  &_pic {
    text-align: center;
    img {
      border-radius: 20rpx;
    }
  }
}
</style>


