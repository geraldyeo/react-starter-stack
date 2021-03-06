/* eslint-disable camelcase, quote-props */
import path from 'path';
import {argv} from 'yargs';
import debug from 'debug';
const pkg = require('../package.json');

const print = debug('app:config:_base');
const config = {
	env: process.env.NODE_ENV || 'development',

	// ======================================== //
	//     Project Structure
	// ======================================== //
	path_base: path.resolve(__dirname, '../'),
	dir_client: 'src',
	dir_dist: 'dist',
	dir_server: 'server',
	dir_test: 'tests',

	// ======================================== //
	//     Server Configuration
	// ======================================== //
	server_host: 'localhost',
	server_port: process.env.PORT || 3000,

	// ======================================== //
	//     Compiler Configuration
	// ======================================== //
	compiler_css_modules: true,
	compiler_devtool: 'inline-source-map',
	compiler_hash_type: 'hash',
	compiler_fail_on_warning: false,
	compiler_quiet: false,
	compiler_public_path: '',
	compiler_stats: {
		chunks: false,
		chunkModules: false,
		colors: true
	},
	compiler_vendor: [
		'babel-polyfill',
		'history',
		'react',
		'react-redux',
		'react-router',
		'react-router-redux',
		'redux'
	],

	// ======================================== //
	//     Test Configuration
	// ======================================== //
	coverage_enabled: !argv.watch,
	coverage_reporters: [
		{type: 'text-summary'},
		{type: 'lcov', dir: 'coverage'}
	]
};

// ======================================== //
//
// All Internal Configuration Below
// Edit at Your Own Risk
//
// ======================================== //

// ======================================== //
//     Environment
// ======================================== //
// N.B.: globals added here must _also_ be added to package.json `xo` property
config.globals = {
	'process.env': {
		'NODE_ENV': JSON.stringify(config.env)
	},
	'NODE_ENV': config.env,
	'__CLIENT__': true,
	'__SERVER__': false,
	'__DEV__': config.env === 'development',
	'__PROD__': config.env === 'production',
	'__TEST__': config.env === 'test',
	'__DEBUG__': config.env === 'development' && !argv.no_debug,
	'__DEBUG_NEW_WINDOW__': Boolean(argv.nw),
	'__BASENAME__': JSON.stringify(process.env.BASENAME || '')
};

// ======================================== //
//     Validate Vendor Dependencies
// ======================================== //
config.compiler_vendor = config.compiler_vendor
	.filter(dep => {
		if (pkg.dependencies[dep]) {
			return true;
		}

		print(
			`Package "${dep}" was not found as an npm dependency in package.json;
			it won't be included in the webpack vendor bundle.
			Consider removing it from vendor_dependencies in ~/config/index.js`
		);
	});

// ======================================== //
//     Utilities
// ======================================== //
config.utils_paths = (() => {
	const resolve = path.resolve;
	const base = (...args) => resolve.apply(resolve, [config.path_base, ...args]);

	return {
		base,
		client: base.bind(null, config.dir_client),
		dist: base.bind(null, config.dir_dist)
	};
})();

export default config;
