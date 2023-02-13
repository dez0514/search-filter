import shfSelection from './src'
import ElementUI from 'element-ui'
// 提供 install 安装方法，供按需引入
shfSelection.install = function(Vue){
  Vue.use(ElementUI)
  Vue.component(shfSelection.name, shfSelection)
}

export default shfSelection