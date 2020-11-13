<template>
  <div
    class="pull-refresh"
    ref="pullRefresh"
    @touchstart="touchstart"
    @touchmove="touchmove"
    @touchend="touchend"
    :style="trackStyle"
  >
    <slot></slot>
    <div class="pull-more" slot="more" v-if="textShow">
      {{ textShow }}
    </div>
  </div>
</template>

<script>
export default {
  name: "pull-refresh",
  props: {
    pulltext: {
      required: false,
      default: "上拉加载更多",
      type: [Number, String],
    },
    nopulltext: {
      required: false,
      default: "没有更多了",
      type: [Number, String],
    },
    pulling: {
      required: false,
      default: "正在加载",
      type: [Number, String],
    },
    haveMoreData: {
      required: true,
      default: true,
      type: [Boolean, Number],
    },
  },
  data() {
    return {
      startTop: 0,
      scrollTop: 0,
      scrollHeight: 0,
      clientHeight: 0,
      duration: 100,
      distance: 0,
      send: false,
      timer: null,
      textShow: "",
    };
  },
  methods: {
    forceUpdate() {
      // 重置视图
      // 统一处理文字问题
      this.$nextTick(() => {
        this.getScrollHeight();
        this.handleText();
        this.send = false;
      });
    },
    handleText() {
      if (this.haveMoreData) {
        if (this.textShow === this.pulling) {
          this.textShow = this.pulltext;
        }
      } else {
        console.log("no more", this.textShow);
        this.textShow = this.nopulltext;
        setTimeout(() => {
          this.textShow = 0;
        }, 1000);
      }
    },
    touchmove() {
      if (!this.haveMoreData) {
        return;
      }
      let pageY = event.touches[0].pageY;
      if (pageY - this.startTop > 10) {
        return;
      }
      this.getScrollTop();
      if (this.canScrollHeight <= 0) {
        if (this.distance <= 80) this.distance += 10;
      }
    },
    touchend() {
      if (this.canScrollHeight <= 0) {
        this.duration = this.distance * 10;
        this.distance = 0;
        if (!this.send) {
          this.send = true;
          this.timer = setTimeout(() => {
            this.pullBottom();
          }, this.duration);
        }
      }
    },
    touchstart(event) {
      this.startTop = event.touches[0].pageY;
    },
    pullBottom() {
      if (this.haveMoreData) {
        this.textShow = this.pulling;
        this.$emit("pullBottom");
      } else {
        return;
      }
    },
    getScrollTop() {
      // 获取整体元素的移动距离
      this.scrollTop = document.body.scrollTop;
      // console.log('scrollTop',this.scrollTop)
    },
    getScrollHeight() {
      // 获取上下文的整体高度
      this.scrollHeight = document.body.scrollHeight;
    },
    getClientHeight() {
      // 获取视窗高度
      this.clientHeight = document.documentElement.clientHeight;
    },
  },
  computed: {
    canScrollHeight() {
      // 可滚动距离
      return this.scrollHeight - this.clientHeight - this.scrollTop;
    },
    trackStyle() {
      return {
        transitionDuration: `${this.duration}ms`,
        transform: this.distance ? `translate3d(0,${-this.distance}px, 0)` : "",
      };
    },
  },
  mounted() {
    this.textShow = this.pulling;
    this.forceUpdate();
    this.getClientHeight();
    this.getScrollTop();
  },
};
</script>

<style>
.pull-more {
  text-align: center;
}
</style>