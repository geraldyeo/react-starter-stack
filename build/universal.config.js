import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';

export default {
	assets: {
		images: {
			extensions: [
				'jpeg',
				'jpg',
				'png',
				'gif'
			],
			parser: WebpackIsomorphicToolsPlugin.url_loader_parser
		},
		fonts: {
			extensions: [
				'woff',
				'woff2',
				'ttf',
				'otf',
				'eot'
			],
			parser: WebpackIsomorphicToolsPlugin.url_loader_parser
		},
		svg: {
			extension: 'svg',
			parser: WebpackIsomorphicToolsPlugin.url_loader_parser
		}
	}
};
