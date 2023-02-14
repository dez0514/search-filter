import '../../styles/reset.scss'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui';
import '@build/shf-ui.css';
import DocDroplist from './components/droplist'
export default ({
	Vue
}) => {
	Vue.use(ElementUI)
	import('@build/shf-ui.umd.min.js').then((data) => {
		const shfui = data.default
    console.log('shfui===', shfui)
		Vue.use(shfui)
    Vue.component('DocDroplist', DocDroplist)
	})
}
