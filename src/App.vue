<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div @click="test">点点点</div>
    <custom-swiper
      ref="swiper"
      class="father"
      @change="change"
      :initialSwipe="active"
      @hasChanged="hasChanged"
    >
      <custom-item>
        <div class="wrap">
          <div class="a" ref="ref1">
            <div
              v-for="(item, index) in new Array(60).fill('scroll1')"
              :key="index"
            >
              {{ item }}
            </div>
          </div>
          <div class="b">
            <div
              class="b-1"
              v-for="(item, index) in new Array(60).fill('scroll1')"
              :key="index"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </custom-item>
      <custom-item class="wrap"
        ><div class="a" ref="ref2">
          <div
            v-for="(item, index) in new Array(60).fill('scroll2')"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
        <div class="b">
          <div
            class="b-1"
            v-for="(item, index) in new Array(60).fill('scroll2')"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
      </custom-item>
      <custom-item class="wrap"
        ><div class="a" ref="ref3">
          <div
            v-for="(item, index) in new Array(60).fill('scroll2')"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
        <div class="b">
          <div
            class="b-1"
            v-for="(item, index) in new Array(60).fill('scroll2')"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
      </custom-item>
    </custom-swiper>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import customSwiper from "./components/customSwiper";
import customItem from "./components/customItem";

export default {
  name: "App",
  data() {
    return {
      refs: [1, 2, 3],
      active: 0,
    };
  },
  components: {
    customSwiper,
    customItem,
  },
  methods: {
    change(index) {
      console.log(index);
    },
    test() {
      this.active = this.active === 1 ? 0 : 1;
    },
    hasChanged(index) {
      console.log(index);
    },
  },
  mounted() {
    this.$refs.swiper.bindEvent(this.$refs.ref1);
    this.$refs.swiper.bindEvent(this.$refs.ref2);
    this.$refs.swiper.bindEvent(this.$refs.ref3);
  },
};
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.custom-item {
  overflow-y: scroll;
}
.wrap {
  height: 500px;
  overflow-y: scroll;
}
.a {
  /* flex: 1; */
  float: left;
  width: 50%;
}
.b {
  /* flex: 1; */
  float: left;
  width: 50%;
  overflow-x: scroll;
}
.b-1 {
  width: 300px;
}
</style>
