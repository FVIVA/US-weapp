<template>
  <div>
    <!-- <img class="bg" src="../../../static/images/pesonbg.jpg"> -->
    <div class="head">
       <input placeholder="输入关键词" v-model="searchKey"/>
       <i-icon type="search" size="24" color="#000" @click="searchDynamic" />
    </div>
    <div class="main">
      <i-divider v-if="blank" content="加载已经完成,没有其他数据"></i-divider>
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
            <img v-for="(pic,picIndex) in item.dynamic_img" :src="pic" :key="pic.id" @click="previewDynamic(pic,index)" mode="aspectFill">
          <!-- </div> -->
         </div>
        <div class="info__item_tool" v-if="item.location">
          <span v-if="item.location">
            <img src="/static/images/weizhi.png" @click="changeState(item)">
            {{item.location}}
          </span>
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
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  data () {
    return {
      dynamicList: [],
      sendModal: false,
      searchKey: '',
      blank: false
    }
  },
  onPullDownRefresh () {
    console.log('下拉')
    this.getDynamicList()
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
      wx.showLoading({
        title: '搜索中'
      })
      wx.cloud.callFunction({
        name: 'searchDynamic',
        data: dynamicdata
      }).then(res => {
        wx.hideLoading()
        this.dynamicList = res.result.data.reverse()
        if (res.result.data.length === 0) {
          this.blank = true
        } else {
          this.blank = false
        }
      })
    },
    getDynamicList () {
      // const dynamicdata = {
      //   dynamic_content: this.searchKey
      // }
      wx.cloud.callFunction({
        name: 'getDynamicList'
      }).then(res => {
        if (res.result.data.length === 0) {
          this.blank = true
        } else {
          this.blank = false
        }
        this.dynamicList = res.result.data.reverse()
        wx.stopPullDownRefresh()
        this.dynamicList.forEach(v => {
          v.create_time = dateformate(v.create_time)
        })
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
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 85%;
  margin: 0 auto;
  margin-bottom: 20rpx;
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
    // text-align: right;
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
      width: 100%;
    }
  }
}
</style>


