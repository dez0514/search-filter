import '../../styles/reset.scss'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui';
import '@build/shf-ui.css';
import VueClipBoard from 'vue-clipboard2'
export default ({
	Vue
}) => {
	Vue.use(ElementUI)
	import('@build/shf-ui.umd.min.js').then((data) => {
		const shfui = data.default
    // console.log('shfui===', shfui)
		Vue.use(shfui)
    Vue.use(VueClipBoard)
	})
}
