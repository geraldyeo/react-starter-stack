import WebpackIsomorphicTools from 'webpack-isomorphic-tools';
import config from '../config';
import universalConfig from '../build/universal.config';

global.webpackIsomorphicTools = new WebpackIsomorphicTools(universalConfig)
	.development(config.globals.__DEV__)
	.server(config.path_base, function () {
		require('../server/main');
	});
