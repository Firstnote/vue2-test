import Vue from 'vue'
// import App from './App.vue'
import App from './scroll.vue'
// import {ZlAddresspicker} from 'zl-ui'
// import {Cell} from 'vant'
// import zl from 'zl-ui'
// import zl from 'fake-ui'
Vue.config.productionTip = false

// Vue.use(Col)
// Vue.use(zl)
// console.log(Cell)
// Vue.use(ZlAddresspicker)
new Vue({
  render: h => h(App),
}).$mount('#app')
