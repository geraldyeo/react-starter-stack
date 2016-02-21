import webpackDevMiddleware from 'webpack-dev-middleware';
import applyExpressMiddleware from '../lib/apply-express-middleware';
import debug from 'debug';
import config from '../../config';

const paths = config.utils_paths;
const print = debug('app:server:webpack-dev');

export default function (compiler, publicPath) {
	print('Enable webpack dev middleware.');

	const middleware = webpackDevMiddleware(compiler, {
		publicPath,
		contentBase: paths.base(config.dir_client),
		hot: true,
		quiet: config.compiler_quiet,
		noInfo: config.compiler_quiet,
		lazy: false,
		stats: config.compiler_stats
	});

	return async function koaWebpackDevMiddleware(ctx, next) {
		let hasNext = await applyExpressMiddleware(middleware, ctx.req, { // eslint-disable-line prefer-const
			end: content => (ctx.body = content),
			setHeader() {
				ctx.set(...arguments);
			}
		});

		if (hasNext) {
			await next();
		}
	};
}
