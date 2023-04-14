// const faviconHead = ['link', {
// 	rel: 'shortcut icon',
// 	type: 'image/x-icon',
// 	href: '/favicon.ico'
// }];

const baseConfig = {
	base: '/',
	dest: 'doc-public',
	// head: faviconHead,
	title: 'ShfUI',
	description: '基于vue2.x && ElementUI， 开发与测试',
	plugins: [
		'@vuepress/back-to-top',
		'@vuepress/last-updated',
		'@vuepress/plugin-nprogress',
		'demo-code'
	],
	chainWebpack: (config) => {
		config.resolve.alias
			.set('@build', `../../lib`)
	},
	markdown: {
		extendMarkdown: (md) => {
			md.use(require('markdown-it-vuese'), {
				// root: '',
				// vueseRe: /<\[vuese-h3\]\((.+)\)/i,
				// ruleName: 'vuese-h3',
				// useRender: (vueseRender) => {
				// 	const renderRes = vueseRender.render()
				// 	const genMd = key => `### ${key}\n${renderRes[key]}\n`

				// 	return Object.keys(renderRes).map(genMd).join('')
				// }
			})
		}
	},
	themeConfig: {
		editLinks: false,
		smoothScroll: true,
		lastUpdated: '最后更新时间',
		docsDir: 'docs',
		sidebarDepth: 2,
		logo: '/assets/logo.png',
		// nav: [
		//   {
		// 		text: '开发文档',
		// 		ariaLabel: '文档菜单',
		// 		items: [
		//       {
		//         text: 'xxx',
		//         link: ''
		//       }
		// 		]
		// 	}
		// ],
		sidebar: [
			{
				title: '开发指南',
				collapsable: false,
				children: [
					['version/install', '安装'],
				]
			},
			{
				title: '组件',
				collapsable: true,
				children: [
					'specific/icon',
					'specific/droplist',
					'specific/selection',
					'helo'
				]
			},
			// {
			// 	title: '更新日志',
			// 	collapsable: false,
			// 	children: [
			// 		'version/log'
			// 	]
			// },
			['version/log', '更新日志']
		]
	}
};

module.exports = baseConfig