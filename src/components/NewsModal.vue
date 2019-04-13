<template>
	<div>
    <div class="modal-mask" v-show="value" @click="showModal"></div>
    <div class="modal-main" v-show="value">
      <div class="btn" @click="showModal"></div>
      <div class="modal-main__inner">
        <div class="title">{{news.title}}</div>
        <p class="rule">
          {{news.des}}
        </p>
        <div class="image" :style="{backgroundImage: 'url(' + news.pic + ')', backgroundSize:'cover'}"></div>
      </div>
    </div>
    <!-- <div class="btn" @click="showModal"></div> -->
	</div>
</template>

<script>
export default {
  name: 'RuleModal',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    news: {
      type: Object,
      required: true
    }
  },
  computed: {
  },
  data () {
    return {
      show: this.value
    }
  },
  methods: {
    showModal () {
      this.$emit('input', this.show)
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-mask {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, .5);
	font-size: 0.2rem;
	z-index: 10;
	line-height: 1.6;
}
.modal-main {
	position: fixed;
	bottom: 0;
	margin: 2.06rem auto 0;
	width: 7.5rem;
	background-color: rgba($color: #fff, $alpha: 0.8);
	overflow: hidden;
	z-index: 1000;
	border-radius: 0.1rem 0.1rem 0 0;
	// padding-bottom: constant(safe-area-inset-bottom);
  // padding-bottom: env(safe-area-inset-bottom);
  -webkit-animation-name: fadeIn; /*动画名称*/
  -webkit-animation-duration: 0.5s; /*动画持续时间*/
  -webkit-animation-iteration-count: 1; /*动画次数*/
  -webkit-animation-delay: 0s; /*延迟时间*/
	&__inner {
		width: 6.9rem;
		margin: 0 auto;
	}
}
.title {
	font-size: 0.28rem;
	line-height: 0.4rem;
	margin: 0.3rem 0 0.5rem;
	color: #000000;
	letter-spacing: 0.04rem;
	text-align: center;
	font-weight: 500;
}
.image {
  width: 100%;
  height: 400rpx;
	margin: 0.56rem 0;
}
.rule {
	margin: 0.56rem 0;
	height: 2rem;
	overflow: scroll;
  -webkit-overflow-scrolling: touch;/* ios 平滑滚动*/
	overflow-scrolling: touch;
	-webkit-transform: translate3d(0,0,0);/* android 平滑滚动*/
	color: #666;
	font-size: 0.24rem;
	line-height: 1.5;
}
@-webkit-keyframes fadeIn {
  0% {
  opacity: 0; /*初始状态 透明度为0*/
  }
  50% {
  opacity: 0.5; /*中间状态 透明度为0*/
  }
  100% {
  opacity: 1; /*结尾状态 透明度为1*/
  }
}
</style>
