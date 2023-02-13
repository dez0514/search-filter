import shfIcon from './src'
// 提供 install 安装方法，供按需引入
shfIcon.install = function(Vue){
  Vue.component(shfIcon.name, shfIcon)
}


export default shfIcon
