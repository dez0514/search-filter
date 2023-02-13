import shfIcon from './shf-icon'
import shfDroplist from "./shf-droplist";
import shfSelection from "./shf-selection";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../styles/reset.scss'
// 引入svg资源
const requireAllSvg = () => {
  const reqSvg = require.context('/packages/shf-icon/icons/svg', false, /\.svg$/)
  reqSvg.keys().map(reqSvg)
}
requireAllSvg()

const components = [
  shfIcon,
  shfDroplist,
  shfSelection
]

function install(Vue) {
  if (install.installed) return
  Vue.use(ElementUI)
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default install
export {
  shfIcon,
  shfDroplist,
  shfSelection
}

