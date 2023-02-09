import shfDroplist from "./shf-droplist/index.vue";
import shfSelection from "./shf-selection/index.vue";
// import shfSelect from "./shf-select/index.vue";
import '../assets/icons/index.js';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../style/reset.scss'
const components = {
  // shfSelect,
  shfDroplist,
  shfSelection
};

function install(Vue) {
  Vue.use(ElementUI)
  const keys = Object.keys(components);
  keys.forEach((name) => {
    const component = components[name];
    Vue.component(component.name || name, component);
  });
}

export default {
  install,
  ...components,
};

