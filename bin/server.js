import WebpackIsomorphicTools from 'webpack-isomorphic-tools';
import config from '../config';
import universalConfig from '../build/universal.config';

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEV__ = config.globals.__DEV__;
global.__NO_SSR__ = false;

global.webpackIsomorphicTools = new WebpackIsomorphicTools(universalConfig)
	.development(config.globals.__DEV__)
	.server(config.path_base, function () {
		require('../server/main');
	});
