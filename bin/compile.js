import fs from 'fs-extra';
import debug from 'debug';
import webpack from 'webpack';
import webpackConfig from '../build/webpack.config';
import config from '../config';

const print = debug('app:bin:compile');
const paths = config.utils_paths;

print('Create webpack compiler.');
const compiler = webpack(webpackConfig);

compiler.run((err, stats) => {
	const jsonStats = stats.toJson();

	print('Webpack compile completed.');
	console.log(stats.toString(config.compiler_stats));

	if (err) {
		print('Webpack compiler encountered a fatal error.', err);
		process.exit(1);
	} else if (jsonStats.errors.length > 0) {
		print('Webpack compiler encountered errors.');
		console.log(jsonStats.errors);
		process.exit(1);
	} else if (jsonStats.warnings.length > 0) {
		print('Webpack compiler encountered warnings.');

		if (config.compiler_fail_on_warning) {
			process.exit(1);
		}
	} else {
		print('No errors or warnings encountered.');
	}

	print('Copy static assets to dist folder.');
	fs.copySync(paths.client('static'), paths.dist());
});
