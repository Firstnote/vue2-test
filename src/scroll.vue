<template>
  <div id="app">
    <div class="item">头部</div>
    <pull-refresh @pullBottom='getMore' ref="pullRefresh" :haveMoreData="haveMoreData">
      <div class='item' v-for="(item,index) in arr" :key="index" >{{item}}</div>
    </pull-refresh>
    <div class="item">
      底部
    </div>
  </div>
</template>

<script>
const baseArray = [1,2,3]
import pullRefresh from './components/pullRefresh'

export default {
  name:'App',
  components:{
    pullRefresh
  },
  data(){
    return {
      arr:[],
      haveMoreData:true
    }
  },
  methods:{
    getMore(){
      setTimeout(()=>{
        if(this.arr.length>10){
          this.haveMoreData = false
        }else{
          this.arr = this.arr.concat(baseArray)
        }
        this.$refs.pullRefresh.forceUpdate()
      },2000)
    }
  },created(){
    this.arr = [].concat(baseArray)
  }
}
</script>

<style>
.item{
  border: 1px solid black;
  height: 300px;
}
</style>