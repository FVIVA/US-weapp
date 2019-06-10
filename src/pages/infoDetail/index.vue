<template>
  <div class="box">
    <div class="main">
      <!-- <div class="info">
        <img :src="userInfo.avatar">
        <br>
        <span style="font-size: 28rpx; margin-right:20rpx;">{{userInfo.nickname}}</span>
        <br>
        <span style="font-size:24rpx; color:#aaa;">
          {{userInfo.school || '-'}} | 交换{{userInfo.change_time}}次 | {{userInfo.age}} | {{userInfo.gender}}
        </span>
      </div> -->
      <i-divider v-if="blank" content="加载已经完成,没有其他数据"></i-divider>
      <div class="dynamic">
        <i-swipeout i-class="dynamic_item" v-for="(item,index) in dynamicList" :key="item.id" :unclosable="true">
          <i-row slot="content">
            <i-col span="2"><span  style="font-size:30rpx;">{{item.create_time_day}}</span></i-col>
            <i-col span="2"><span style="font-size:22rpx; text-align: right;">{{item.create_time_month}}月</span></i-col>
            <i-col span="8" v-if="item.dynamic_img[0]">
              <img class="dynamic_img" :src="item.dynamic_img[0]" @click="previewDynamic(item.dynamic_img[0],index)">
            </i-col>
            <i-col span="11"><span class="dynamic_content">{{item.dynamic_content}}</span></i-col>
          </i-row>
          <view slot="button" >
            <div class="dynamic_item-bt" @click="openDel(item._id)"><i-icon type="trash" /></div>
          </view>
        </i-swipeout>
      </div>
    </div>
    <send></send>
    <i-modal title="删除确认" :visible="delModal" @ok="delDynamic" @cancle="delModal = false" show-ok show-cancle>
        <view>删除后无法恢复哦</view>
    </i-modal>
  </div>
</template>

<script>
import send from '@/components/send'
export default {
  onShow () {
    wx.setNavigationBarTitle({title: '动态'})
    this.getDynamicList()
  },
  components: {
    send
  },
  data () {
    return {
      sendModal: false,
      dynamicList: [],
      delModal: false,
      currentDynamicId: ''
    }
  },
  created () {
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  methods: {
    toEditInfo () {},
    getDynamicList () {
      const dynamicData = {
        user_id: this.userInfo.user_id
      }
      wx.cloud.callFunction({
        name: 'getDynamicList',
        data: dynamicData
      }).then(res => {
        res.result.data.forEach(v => {
          const cdate = new Date(v.create_time)
          console.log(cdate)
          v.create_time_month = cdate.getMonth() + 1
          v.create_time_day = cdate.getDate()
        })
        this.dynamicList = res.result.data
      })
    },
    previewDynamic (pic, index) {
      var urlsList = this.dynamicList.map(v => v.dynamic_img)[index]
      wx.previewImage({
        current: pic, // 当前显示图片的http链接
        urls: urlsList// 需要预览的图片http链接列表
      })
    },
    openDel (id) {
      this.delModal = true
      this.currentDynamicId = id
    },
    delDynamic () {
      const dynamicData = {
        dynamic_id: this.currentDynamicId
      }
      console.log(dynamicData)
      wx.cloud.callFunction({
        name: 'deleteDynamic',
        data: dynamicData
      }).then(res => {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000
        })
        this.delModal = false
        this.getDynamicList()
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
.main {
  width: 90%;
  height: auto;
  margin: 40rpx auto;
  // background: rgba(#fff,0.8);
}
.info {
  text-align: center;
  background: rgba(#fff,0.8);
  margin-bottom: 20rpx;
  padding: 20rpx;
  position: relative;
  img {
    width: 150rpx;
    height: 150rpx;
    border-radius: 50%;
  }
  .auth {
    display: inline-block;
    
    height: 25rpx;
    line-height: 25rpx;
    font-size: 20rpx;
    padding: 5rpx;
    border-radius: 15rpx;
    position: absolute;
    right: 20rpx;
    top: 20rpx;
  }
}
.dynamic {
  vertical-align: top;
  background: rgba(#fff,0.8);
  &_item {
    background: transparent;
    width: 150rpx;
    height: 350rpx;
    border: none;
    &-bt {
      width: 300rpx;
      height: 100%;
      // line-height: 300rpx;
      display: inline-block;
      text-align: center;
    }
  }
  &_img {
    width:200rpx;
    height: 200rpx;
    border-radius: 6px;
  }
  &_content {
    font-size: 26rpx;
    vertical-align: top;
    word-wrap: break-word;
  }
}
</style>

<style lang="scss">
.dynamic_item .i-swipeout-wrap {
  border: none;
}
</style>

