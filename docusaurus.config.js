const path = require('path');
const fs = require('fs');

const AT_NOTATION_KEYS = {
	short: 'Short',
	type: 'Type',
	descr: 'Descr',
	changelog: 'Changelog',
	signature: 'Signature',
	params: 'Params',
	returns: 'Returns',
	values: 'Values'
};

const fileContentCache = new Map();
const sidebarLabelCache = new Map();


const COMPONENTS_PATH = '@site/src/components';

let components = { };
let metaDescription = '';

const wrapDataWithComponent = (data, componentName) => {
	return componentName ? `\n<${componentName}>\n${data}\n\n</${componentName}>\n\n` : data;
}

const onAtNotationMatch = (data, { key }) => {
	const componentName = AT_NOTATION_KEYS[key];
	if (componentName) {
		components[componentName] = componentName;
	}

	switch(key) {
		case 'default':
			return `<strong>Default value: </strong> ${data}`;
		case 'example':
			return `**Example**\n~~~js\n${data.replace(/^(?:\n*)([^]+?)(?:\n*)$/g, '$1')}\n~~~`;
		case 'metadescr':
			metaDescription = data.replace(/^(?:\n*)(.+)(?:\n|.)*/, '$1');
			return '';
		// TODO: remove later
		case 'relatedsample':
			return data;
		default:
			return componentName
				? wrapDataWithComponent(data, componentName)
				: data;
	}
};

const onAtNotationFunctionMatch = (data, { key, fullMatch, dir }) => {
	if (data.indexOf('.md') !== -1 || data.indexOf('.mdx') !== -1 || data.indexOf('.') === -1) {
		const result = readFile(dir, data);
		return result ? /@short: (.*)/g.exec(result)[1] : fullMatch;
	}
	return fullMatch;
}

const onBraceNotationMatch = (data, { key, fullMatch }) => {
	switch(key) {
		case 'note':
			return `:::note\n${data}\n:::`;
		case 'pronote':
			return `:::tip Pro version only\n${data}\n:::`;
		case 'editor':
			return data;
		default:
			return fullMatch;
	}
};

const readFile = (workingDir, filePath) => {
	workingDir = workingDir.replace(/\\/g, '/');
	filePath = filePath.replace(/\\/g, '/');
	let finalPath = workingDir + '/' + filePath;

	if (finalPath.indexOf('.') === -1) {
		finalPath += !fs.existsSync(finalPath + '.md') ? '.mdx' : '.md';
	}

	const normalizedPath = path.normalize(finalPath);


	if (!fs.existsSync(finalPath)) {
		const clippedFilePath = filePath.split('/');
		clippedFilePath.shift();
		if (!clippedFilePath.length) {
			return false;
		}
		return readFile(workingDir, clippedFilePath.join('/'));
	}


	if (fileContentCache.has(normalizedPath)) {
		return fileContentCache.get(normalizedPath);
	}

	const content = fs.readFileSync(normalizedPath, "utf8");
	fileContentCache.set(normalizedPath, content);
	return content;
};

const onEmptyLinkMatch = (data, { key, fullMatch, dir }) => {
	const filePath = fullMatch.substring(fullMatch.indexOf('(') + 1, fullMatch.length - 1);
	if (
		filePath.indexOf('.md') !== -1 || 
		filePath.indexOf('.mdx') !== -1 || 
		filePath.indexOf('.') === -1
	) {
		const data = readFile(dir, filePath);

		if(!data) {
			return fullMatch;
		}

		let label =  sidebarLabelCache.get(filePath);
		if (!label) {
			const labelMatch = /sidebar_label: (.+)/g.exec(data);
			if(!labelMatch) {
				return fullMatch;
			}
			label = labelMatch[1];
			sidebarLabelCache.set(filePath, label);
		}
		const urlPart = fullMatch.match(/\([^)]*\)/g)[0];

		return `[${label}]${urlPart}`;

	}
	return fullMatch;
};

const onAfterDataTransformation = (data) => {
	const allAvailableComponents = Object.values(components);
	let transformedData = data;

	if (allAvailableComponents.length !== 0) {
		const imports = `import { ${allAvailableComponents.join(', ')} } from '${COMPONENTS_PATH}';\n\n`;
		const isTitles = /---((?:\r?\n|\r)|.)+?---/.test(transformedData);
		transformedData = isTitles
			? transformedData.replace(/^(---((?:\s*\n)|.)+?---)/, `$1\n\n${imports}`)
			: imports + transformedData;
	}

	if (metaDescription) {
		transformedData = transformedData.replace(/^(---\s*\n)((?:\n|.)+?)(---\s*?\n*)/,  (fullMatch, groupA, groupB, groupC) => {
			const isDocusaurusDescriptionExist = /^description: *.*\n/m.test(fullMatch);
			if (!isDocusaurusDescriptionExist) {
				return `${groupA}description: ${metaDescription}\n${groupB}${groupC}`;
			}
			return fullMatch;
		});
	}

	components = { };
	metaDescription = '';

	return transformedData;
};
// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

//const lightCodeTheme = require('prism-react-renderer/themes/github');
//const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
	noIndex: false,
	title: 'DHTMLX Gantt Docs',
	tagline: 'DHTMLX Gantt Docs',
	url: 'https://docs.dhtmlx.com',
	baseUrl: '/gantt/',
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'de', 'ru', 'ko', 'zh'],
		localeConfigs: {
			zh: {
				htmlLang: 'zh-ZH',
				label: '中文'
			},
		}
	},
	markdown: {
		hooks: {
			onBrokenMarkdownLinks: 'throw',
		}
	},
	onBrokenLinks: 'throw',
	onBrokenAnchors: 'warn',
	favicon: 'img/favicon.ico',
	organizationName: 'DHTMLX', // Usually your GitHub org/user name.
	projectName: 'gantt-docs', // Usually your repo name.
	trailingSlash: true,
	presets: [
		[
			'@docusaurus/preset-classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					editUrl: 'https://github.com/DHTMLX/gantt-docs/edit/master/',
					routeBasePath: '/',
				},
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
				sitemap: {
					changefreq: 'daily',
					priority: 0.5,
					// trailingSlash: true
				},
			}),
		],
  	],
	plugins: [
		'docusaurus-plugin-sass',
		[
			path.resolve(__dirname, './plugins/dhx-md-data-transformer-plugin'),
			{
				onBraceNotationMatch,
				onAtNotationMatch,
				onAtNotationFunctionMatch,
				onEmptyLinkMatch,
				onAfterDataTransformation
			}
		],
		[
			require.resolve('docusaurus-gtm-plugin'),
			{
				id: 'GTM-5M5RCSJ'
			}
		]
	],
	themes: [ 
		[ // Local search parameters
			require.resolve("@easyops-cn/docusaurus-search-local"),
			{
				indexDocs: true,
				indexPages: true,
				hashed: true,
				highlightSearchTermsOnTargetPage: true,
				removeDefaultStemmer: true,
				removeDefaultStopWordFilter: true,
				explicitSearchResultPath: true
			}
		]
	],

  	themeConfig:
    /* @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
		navbar: {
			title: 'JavaScript Gantt Documentation',
			logo: {
				alt: 'DHTMLX JavaScript Gantt Logo',
				src: 'img/logo.svg',
				href: 'https://docs.dhtmlx.com/'
			},
			items: [
				{
					"label": "Examples",
					"href": "https://docs.dhtmlx.com/gantt/samples/",
					"position": "right"
				},
				{
					"label": "Forum",
					"href": "https://forum.dhtmlx.com/c/gantt/15",
					"position": "right"
				},
				{
					"label": "Support",
					"href": "https://dhtmlx.com/docs/technical-support.shtml",
					"position": "right"
				},
				{
					"label": "Download",
					"href": "https://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml",
					"position": "right"
				},
				{
					type: 'localeDropdown',
					position: 'right',
				},
			]
		},
    	footer: {
			"style": "dark",
			"links": [
				{
					"title": "Development center",
					"items": [
						{
							"label": "Download Gantt",
							"href": "https://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml",
							"position": "right"
						},
						{
							"label": "Examples",
							"href": "https://docs.dhtmlx.com/gantt/samples/",
							"position": "right"
						},
						{
							"label": "Blog",
							"href": "https://dhtmlx.com/blog/"
						},
						{
							"label": "Forum",
							"href": "https://forum.dhtmlx.com/c/gantt/15",
							"position": "right"
						}
					]
				},
				{
					"title": "Community",
					"items": [
						{
							"label": "GitHub",
							"href": "https://github.com/DHTMLX"
						},
						{
							"label": "Youtube",
							"href": "https://www.youtube.com/user/dhtmlx"
						},
						{
							"label": "Facebook",
							"href": "https://www.facebook.com/dhtmlx"
						},
						{
							"label": "Twitter",
							"href": "https://twitter.com/dhtmlx"
						},
						{
							"label": "Linkedin",
							"href": "https://www.linkedin.com/groups/3345009/"
						}
					]
				},
				{
					"title": "Company",
					"items": [
						{
							"label": "About us",
							"href": "https://dhtmlx.com/docs/company.shtml"
						},
						{
							"label": "Contact us",
							"href": "https://dhtmlx.com/docs/contact.shtml"
						},
						{
							"label": "Licensing",
							"href": "https://dhtmlx.com/docs/products/dhtmlxEventCalendar/#licensing"
						}
					]
				}
			]
		},
    	prism: {
			//theme: lightCodeTheme,
			//darkTheme: darkCodeTheme,
		}
    })
};

module.exports = config;
