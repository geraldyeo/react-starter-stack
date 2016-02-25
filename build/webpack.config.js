import webpack from 'webpack';
import cssnano from 'cssnano';
import rucksack from 'rucksack-css';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import debug from 'debug';
import universalConfig from './universal.config';
import config from '../config';

const print = debug('app:webpack:config');
const paths = config.utils_paths;
const {__DEV__, __PROD__, __TEST__} = config.globals;
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(universalConfig);

print('Create configuration.');
const webpackConfig = {
	name: 'client',
	target: 'web',
	devtool: config.compiler_devtool,
	resolve: {
		root: paths.base(config.dir_client),
		extensions: ['', '.js', '.jsx', '.styl']
	},
	module: {}
};

// ======================================== //
//     Entry Points
// ======================================== //
const APP_ENTRY_PATH = `${paths.base(config.dir_client)}/main.js`;
const webpackHmr = `webpack-hot-middleware/client?path=${config.compiler_public_path}__webpack_hmr`;

webpackConfig.entry = {
	app: __DEV__ ? ['babel-polyfill', APP_ENTRY_PATH, webpackHmr] :
		['babel-polyfill', APP_ENTRY_PATH],
	vendor: config.compiler_vendor
};

// ======================================== //
//     Bundle Output
// ======================================== //
webpackConfig.output = {
	filename: `[name].[${config.compiler_hash_type}].js`,
	path: paths.base(config.dir_dist),
	publicPath: config.compiler_public_path
};

// ======================================== //
//     Plugins
// ======================================== //
webpackConfig.plugins = [
	new webpack.DefinePlugin(config.globals)
];

if (__DEV__) {
	print('Enable plugins for live development (HMR, NoErrors).');
	webpackConfig.plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		webpackIsomorphicToolsPlugin.development()
	);
} else if (__PROD__) {
	print('Enable plugins for production (OccurenceOrder, Dedupe & UglifyJS).');
	webpackConfig.plugins.push(
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				unused: true,
				dead_code: true, // eslint-disable-line
				warnings: false
			}
		}),
		webpackIsomorphicToolsPlugin
	);
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
	webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
		names: ['vendor']
	}));
}

// ======================================== //
//     Pre-Loaders
// ======================================== //
webpackConfig.module.preLoaders = [{
	test: /\.(js|jsx)$/,
	loader: 'xo',
	exclude: /node_modules/
}];

webpackConfig.module.preLoaders.push({
	test: /\.styl$/,
	loader: 'stylint',
	exclude: /node_modules/
});

webpackConfig.xo = {
	emitWarning: __DEV__
};

// ======================================== //
//     Loaders
// ======================================== //
// JavaScript / JSON
webpackConfig.module.loaders = [{
	test: /\.(js|jsx)$/,
	exclude: /node_modules/,
	loader: 'babel',
	query: {
		cacheDirectory: true,
		plugins: ['transform-runtime'],
		presets: __DEV__ ?
			['es2015', 'react', 'stage-0', 'react-hmre'] :
			['es2015', 'react', 'stage-0']
	}
},
{
	test: /\.json$/,
	loader: 'json'
}];

// Styles
const cssLoader = config.compiler_css_modules ? [
	'css?modules',
	'sourceMap',
	'importLoaders=1',
	'localIdentName=[name]__[local]___[hash:base64:5]'
].join('&') : 'css?sourceMap';

webpackConfig.module.loaders.push({
	test: /\.styl$/,
	include: /src/,
	loaders: [
		'style',
		cssLoader,
		'postcss',
		'stylus?sourceMap'
	]
});

webpackConfig.module.loaders.push({
	test: /\.css$/,
	include: /src/,
	loaders: [
		'style',
		cssLoader,
		'postcss'
	]
});

// Don't treat global stylus as modules
webpackConfig.module.loaders.push({
	test: /\.styl$/,
	exclude: /src/,
	loaders: [
		'style',
		'css?sourceMap',
		'postcss',
		'stylus?sourceMap'
	]
});

// Don't treat global, third-party CSS as modules
webpackConfig.module.loaders.push({
	test: /\.css$/,
	exclude: /src/,
	loaders: [
		'style',
		'css?sourceMap',
		'postcss'
	]
});

webpackConfig.stylus = {
	includePaths: paths.client('styles')
};

webpackConfig.postcss = [
	rucksack(),
	cssnano({
		autoprefixer: {
			add: true,
			remove: true,
			browsers: ['last 2 versions']
		},
		discardComments: {
			removeAll: true
		},
		safe: true,
		sourcemap: true
	})
];

// ======================================== //
//     File loaders
// ======================================== //
/* eslint-disable */
webpackConfig.module.loaders.push(
  { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
);
/* eslint-enable */

// ======================================== //
//     Finalize Configuration
// ======================================== //
// when we don't know the public path (we know it only when HMR is enabled [in development]) we
// need to use the extractTextPlugin to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
if (!__DEV__) {
	print('Apply ExtractTextPlugin to CSS loaders.');
	webpackConfig.module.loaders.filter(
		loader => loader.loaders && loader.loaders.find(name => /css/.test(name.split('?')[0]))
	).forEach(
		loader => {
			const [first, ...rest] = loader.loaders;
			loader.loader = ExtractTextPlugin.extract(first, rest.join('!'));
			delete loader.loaders;
		}
	);

	webpackConfig.plugins.push(
		new ExtractTextPlugin('[name].[contenthash].css', {
			allChunks: true
		})
	);
}

export default webpackConfig;
