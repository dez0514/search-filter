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
		'@vuepress/plugin-nprogress'
	],
	chainWebpack: (config) => {
		config.resolve.alias
			.set('@build', `../../lib`)
	},
	themeConfig: {
		editLinks: false,
		smoothScroll: true,
		lastUpdated: 'Last Updated',
		docsDir: 'docs',
		sidebarDepth: 2,
		logo: '/assets/logo.png',
		// nav: [
    //   {
		// 		text: '开发文档',
		// 		ariaLabel: '文档菜单',
		// 		items: [
    //       {
    //         text: 'JIRA',
    //         link: 'http://doc.tzt.cn:8889/secure/Dashboard.jspa'
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
				collapsable: false,
				children: [
					'specific/droplist',
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