<template>
  <div class="box">
    <img class="bg" src="../../../static/images/pesonbg.jpg">
    <div class="main">
      <img :src="qrCode">
    </div>
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
      qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAAAXNSR0IArs4c6QAACm9JREFUeAHt3cFu67gSBNCbQf7/lzPxwoA3WVTblKjSecBDggFJsU8FBS/kma9///79/P7f/z4o8POzF+nX19cHp/vMUanRjjN8RuLcU/479/GeToDAmQIK4Ex9zyZwsoACODkAjydwpoACOFPfswmcLKAATg7A4wmcKaAAztT3bAInCyiAkwPweAJnCiiAM/U9m8DJAgrg5AA8nsCZAgrgTH3PJnCygAI4OQCPJ3CmwHf68PQd7vT8Hdfv9h56ep8jMkvvtDrnI2ZePUN6/iQDnwBSZesJFAkogKIwjUIgFVAAqZj1BIoEFEBRmEYhkAoogFTMegJFAgqgKEyjEEgFFEAqZj2BIgEFUBSmUQikAgogFbOeQJGAAigK0ygEUgEFkIpZT6BIIP4uQDr75P3k9BnJ+h3fEd/N6OG5452SnCdrd5v5iL9VnwAmfyn2ECgRUAAlQRqDwERAAUzU7CFQIqAASoI0BoGJgAKYqNlDoERAAZQEaQwCEwEFMFGzh0CJgAIoCdIYBCYCCmCiZg+BEgEFUBKkMQhMBBTARM0eAiUCy78LUOK01RhHvCOePmO39+i3Cmzjy/gEsHE4rkZgtYACWC3sfAIbCyiAjcNxNQKrBRTAamHnE9hYQAFsHI6rEVgtoABWCzufwMYCCmDjcFyNwGoBBbBa2PkENhZQABuH42oEVgsogNXCziewsYAC2DgcVyOwWsB3AVYLX/R87/ZfNLjw2j4BhGCWE2gSUABNaZqFQCigAEIwywk0CSiApjTNQiAUUAAhmOUEmgQUQFOaZiEQCiiAEMxyAk0CCqApTbMQCAUUQAhmOYEmAQXQlKZZCIQCCiAEs5xAk8Dy7wKk/375JtxVsxzxnn6a2xF3WuX5PDed+bnvyj99Arhyeu5O4E0BBfAmoO0EriygAK6cnrsTeFNAAbwJaDuBKwsogCun5+4E3hRQAG8C2k7gygIK4MrpuTuBNwUUwJuAthO4soACuHJ67k7gTQEF8Cag7QSuLKAArpyeuxN4U0ABvAloO4ErC8RfBmr40seVA3vcPf3Syh0zu+PMk79rnwAmavYQKBFQACVBGoPAREABTNTsIVAioABKgjQGgYmAApio2UOgREABlARpDAITAQUwUbOHQImAAigJ0hgEJgIKYKJmD4ESAQVQEqQxCEwEFMBEzR4CJQLf6XvlJXPfaoxJxru9Sz+Z4VYhD4f1CWAIZxuBBgEF0JCiGQgMBRTAEM42Ag0CCqAhRTMQGAoogCGcbQQaBBRAQ4pmIDAUUABDONsINAgogIYUzUBgKKAAhnC2EWgQUAANKZqBwFBAAQzhbCPQIPD1O8RPMkj6TvZu75Qns07Xpkbpc44wTWdI77T6/NR0x/Wp0WQGnwAmavYQKBFQACVBGoPAREABTNTsIVAioABKgjQGgYmAApio2UOgREABlARpDAITAQUwUbOHQImAAigJ0hgEJgIKYKJmD4ESAQVQEqQxCEwEFMBEzR4CJQLxfxcgfee7wWn1O9mpaXqf9PyGzCYzpK6TZyR7jsjNJ4AkEWsJlAkogLJAjUMgEVAAiZa1BMoEFEBZoMYhkAgogETLWgJlAgqgLFDjEEgEFECiZS2BMgEFUBaocQgkAgog0bKWQJmAAigL1DgEEgEFkGhZS6BM4Ov3/efovwuwev70/ecjrp/eKTVKZ1h9n/T+j/XpDJNnJHvuaDSZ2SeA5K/KWgJlAgqgLFDjEEgEFECiZS2BMgEFUBaocQgkAgog0bKWQJmAAigL1DgEEgEFkGhZS6BMQAGUBWocAomAAki0rCVQJqAAygI1DoFEQAEkWtYSKBNQAGWBGodAIvD1u3irLwOlXyqZfAEiAXqsTe+Unr96/cRot5nTGSb3P+IZSdbpfZKzn2t9AnhK+EnghgIK4IahG5nAU0ABPCX8JHBDAQVww9CNTOApoACeEn4SuKGAArhh6EYm8BRQAE8JPwncUEAB3DB0IxN4CiiAp4SfBG4ooABuGLqRCTwFFMBTwk8CNxT4Tt+ZTt9PXn3+EZldfeY0g4fp1Wee/F2kTquNJjOke3wCSMWsJ1AkoACKwjQKgVRAAaRi1hMoElAARWEahUAqoABSMesJFAkogKIwjUIgFVAAqZj1BIoEFEBRmEYhkAoogFTMegJFAgqgKEyjEEgFFEAqZj2BIoHvdJb0fendzk/vs+P6NIP0nfXHzKufkZ6f5jCZOX3G6vWp0WRmnwBWp+h8AhsLKICNw3E1AqsFFMBqYecT2FhAAWwcjqsRWC2gAFYLO5/AxgIKYONwXI3AagEFsFrY+QQ2FlAAG4fjagRWCyiA1cLOJ7CxgALYOBxXI7BaQAGsFnY+gY0Fvn7v9rPx/S55tfQd7nTI9J3v1fd53D+9UzrzHWdYbfrIwCeA9C/RegJFAgqgKEyjEEgFFEAqZj2BIgEFUBSmUQikAgogFbOeQJGAAigK0ygEUgEFkIpZT6BIQAEUhWkUAqmAAkjFrCdQJKAAisI0CoFUQAGkYtYTKBLY7r8LsKPt6neyV5+/o2l6p9Ro8t2BdE96p3Tm9D7p+Y/1PgFM1OwhUCKgAEqCNAaBiYACmKjZQ6BEQAGUBGkMAhMBBTBRs4dAiYACKAnSGAQmAgpgomYPgRIBBVASpDEITAQUwETNHgIlAgqgJEhjEJgIKICJmj0ESgQUQEmQxiAwEYi/DJQ+ZPUXJtL7HPEFi/ROq9dPMljtlJ6fzpCuf2SQ3ildn+Y8mSF9hk8AqZj1BIoEFEBRmEYhkAoogFTMegJFAgqgKEyjEEgFFEAqZj2BIgEFUBSmUQikAgogFbOeQJGAAigK0ygEUgEFkIpZT6BIQAEUhWkUAqmAAkjFrCdQJLD8uwBFVtuMsvod9Mmg6Z3S99zT8yczpHvSGdLzj5jZJ4A0FesJFAkogKIwjUIgFVAAqZj1BIoEFEBRmEYhkAoogFTMegJFAgqgKEyjEEgFFEAqZj2BIgEFUBSmUQikAgogFbOeQJGAAigK0ygEUgEFkIpZT6BIwHcBisL8a5TJO+ur30Nfff5k5r/8/vrnq2f467mf/Oc+AXxS01kELiagAC4WmOsS+KSAAvikprMIXExAAVwsMNcl8EkBBfBJTWcRuJiAArhYYK5L4JMCCuCTms4icDEBBXCxwFyXwCcFFMAnNZ1F4GICCuBigbkugU8KKIBPajqLwMUEln8XoOF96dWZrjaanL/6Xfr0Tqvv88g4vdPqv4sjzvcJ4AhlzyCwqYAC2DQY1yJwhIACOELZMwhsKqAANg3GtQgcIaAAjlD2DAKbCiiATYNxLQJHCCiAI5Q9g8CmAgpg02Bci8ARAgrgCGXPILCpgALYNBjXInCEgAI4QtkzCGwqEH8X4Ih3sje1Wnat1HTHd9bTO6UzL8N/OTi9024zp/d5jO4TwMsfgF8J3E1AAdwtcfMSeBFQAC8YfiVwNwEFcLfEzUvgRUABvGD4lcDdBBTA3RI3L4EXAQXwguFXAncTUAB3S9y8BF4EFMALhl8J3E1AAdwtcfMSeBFQAC8YfiVwNwEFcLfEzUvgReB/LljuBaVMdTMAAAAASUVORK5CYII='
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
      if (detail.index === 0) {
        this.delModal = false
      } else {
        this.action[1].loading = true
        setTimeout(() => {
          this.action[1].loading = false
          this.delModal = false
          this.$Message({
            content: '删除成功！',
            type: 'success'
          })
        }, 2000)
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
.box {
  position: relative;
}
.main {
  width: 90%;
  height: 100vh;
  margin: auto;
  background: rgba(#fff,0.8);
  padding: 20rpx;
  text-align: center;
  img {
    margin-top: 100rpx;
    width:400rpx;
    height: 400rpx;
  }
}

</style>


