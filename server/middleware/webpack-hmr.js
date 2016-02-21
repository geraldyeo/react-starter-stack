import webpackHotMiddleware from 'webpack-hot-middleware';
import applyExpressMiddleware from '../lib/apply-express-middleware';
import debug from 'debug';

const print = debug('app:server:webpack-hmr');

export default function (compiler, opts) {
	print('Enable Webpack Hot Module Replacement (HMR).');

	const middleware = webpackHotMiddleware(compiler, opts);

	return async function koaWebpackHMR(ctx, next) {
		let hasNext = await applyExpressMiddleware(middleware, ctx.req, ctx.res); // eslint-disable-line prefer-const

		if (hasNext && next) {
			await next();
		}
	};
}
