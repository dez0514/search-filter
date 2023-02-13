import Vue from 'vue'
import App from './App.vue'
// import ElementUI from 'element-ui'
// import zwdUI from "/packages/index"
// Vue.use(zwdUI)
import { shfDroplist } from "/packages/index"
// Vue.use(shfSelection)
Vue.use(shfDroplist)
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
