<template>
  <div class="custom-swiper">
    <div class="custom-swiper-wrap" ref="swiperwrap" :style="trackStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { on, off } from "../utils/event";
function pageX(event) {
  return (
    (event.touches[0] && event.touches[0].pageX) ||
    (event.targetTouches[0] && event.targetTouches[0].pageX) ||
    (event.changedTouches[0] && event.changedTouches[0].pageX)
  );
}
function pageY(event) {
  return (
    (event.touches[0] && event.touches[0].pageY) ||
    (event.targetTouches[0] && event.targetTouches[0].pageY) ||
    (event.changedTouches[0] && event.changedTouches[0].pageY)
  );
}
export default {
  name: "custom-swiper",
  props: {
    initialSwipe: {
      type: [Number, String],
      default: 0,
    },
    threshold: {
      type: Number,
      default: 80,
    },
  },
  data() {
    return {
      startX: 0,
      startY: 0,
      interval: 0,
      distance: 0,
      startTime: 0,
      refs: [],
      direction: true,
      changedActive: 0,
    };
  },
  methods: {
    bindEvent(ref) {
      // 绑定事件
      on(ref, "touchstart", this.touchstart);
      on(ref, "touchmove", this.touchmove);
      on(ref, "touchend", this.touchend);
      this.refs.push(ref);
    },
    moveJudge(num) {
      if (num > 0 || -num > this.scrollWidth + this.interval) {
        return false;
      } else {
        return true;
      }
    },
    touchstart(event) {
      this.endX = this.distance;
      this.startX = pageX(event);
      this.startY = pageY(event);
      // this.startTime = Date.now();
    },
    touchmove(event) {
      if (!this.direction) {
        return;
      }
      let moveY = pageY(event) - this.startY;
      let moveX = pageX(event) - this.startX;
      if (!this.moveJudge(this.endX + moveX)) {
        return;
      }
      if (Math.abs(moveY) > Math.abs(moveX)) {
        this.direction = false;
        return;
      }
      this.duration = 0;
      this.distance = this.endX + moveX;
    },
    touchend(event) {
      this.endAction(event);
      // 重置方向正确
      this.changeTimer && clearTimeout(this.changeTimer);
      this.changeTimer = setTimeout(() => {
        this.changedActive = this.active;
      }, this.duration);
      this.direction = true;
    },
    endAction() {
      let moveX = this.distance - this.endX;
      if (moveX > this.threshold) {
        if (!this.direction) {
          return;
        }
        let moveResult = this.endX - this.interval;
        this.duration = 200;
        this.distance = moveResult;
      } else if (moveX < -this.threshold) {
        if (!this.direction) {
          return;
        }
        this.duration = 200;
        this.distance = this.endX + this.interval;
      } else {
        this.duration = 200;
        this.distance = this.endX;
      }
    },
    updateInterval() {
      // 更新每次移动的距离
      this.interval = -this.scrollWidth / this.items;
    },
    initSwipe(index) {
      // 初始化当前激活的tab
      this.duration = 0;
      this.distance = this.interval * index;
    },
    change(newWal) {
      this.$emit("change", newWal);
    },
    hasChanged(newWal) {
      this.$emit("hasChanged", newWal);
    },
  },
  computed: {
    active() {
      // 当前激活的tab
      return Math.round(this.distance / this.interval);
    },
    swiperwrap() {
      return this.$refs.swiperwrap;
    },
    items() {
      // 子元素数量
      return this.swiperwrap.children.length;
    },
    clientWidth() {
      // 可视宽度
      return this.swiperwrap.clientWidth;
    },
    scrollWidth() {
      // 可用宽度
      return (
        this.swiperwrap.children[this.initialSwipe].clientWidth * this.items
      );
    },
    trackStyle() {
      // 动态样式
      return {
        transitionDuration: `${this.duration}ms`,
        transform: this.distance ? `translate3d(${this.distance}px,0, 0)` : "",
      };
    },
  },
  watch: {
    initialSwipe(newWal) {
      this.changedActive = newWal;
      this.initSwipe(newWal);
    },
    active(newWal) {
      this.change(newWal);
    },
    changedActive(newWal) {
      this.hasChanged(newWal);
    },
  },
  mounted() {
    this.updateInterval();
    this.initSwipe(0);
  },
  beforeDestroy() {
    this.refs.forEach((ref) => {
      off(ref, "touchstart", this.touchstart);
      off(ref, "touchmove", this.touchmove);
      off(ref, "touchend", this.touchend);
    });
  },
};
</script>

<style>
.custom-swiper {
  width: 100%;
  overflow-x: hidden;
}

.custom-swiper-wrap {
  display: flex;
}
</style>