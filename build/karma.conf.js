import {argv} from 'yargs';
import debug from 'debug';
import config from '../config';
import webpackConfig from './webpack.config';

const print = debug('app:karma');
print('Create configuration.');

const karmaConfig = {
	browsers: ['Electron'],
	singleRun: !argv.watch,
	frameworks: ['tap'],
	basePath: '../', // project root in relation to bin/karma.js
	files: [
		{
			pattern: `./${config.dir_test}/test-bundler.js`,
			watched: false,
			served: true,
			included: true
		}
	],
	preprocessors: {
		[`${config.dir_test}/test-bundler.js`]: ['webpack', 'sourcemap']
	},
	reporters: ['tap'],
	coverageReporter: {
		reporters: config.coverage_reporters
	},
	webpack: {
		node: {
			fs: 'empty'
		},
		devtool: 'inline-source-map',
		resolve: {
			...webpackConfig.resolve,
			alias: {
				...webpackConfig.resolve.alias
			}
		},
		plugins: webpackConfig.plugins,
		module: {
			loaders: webpackConfig.module.loaders
		},
		/* eslint-disable */
		externals: {
			...webpackConfig.externals,
			jsdom: 'window',
			cheerio: 'window',
			'react/lib/ExecutionEnvironment': true,
			'react/lib/ReactContext': 'window',
			'text-encoding': 'window'
		}
		/* eslint-enable */
	},
	webpackMiddleware: {
		noInfo: true
	}
};

if (config.coverage_enabled) {
	karmaConfig.reporters.push('coverage');
	karmaConfig.webpack.module.preLoaders = [{
		test: /\.(js|jsx)$/,
		include: new RegExp(config.dir_client),
		loader: 'isparta',
		exclude: /node_modules/
	}];
}

export default cfg => cfg.set(karmaConfig);
