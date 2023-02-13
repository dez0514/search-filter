import shfDroplist from './src'
import ElementUI from 'element-ui'
// 提供 install 安装方法，供按需引入
shfDroplist.install = function(Vue){
  Vue.use(ElementUI)
  Vue.component(shfDroplist.name, shfDroplist)
}

export default shfDroplist