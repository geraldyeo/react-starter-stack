import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../build/webpack.config';
import config from '../config';
import debug from 'debug';

const print = debug('app:dev-server');
const compiler = webpack(webpackConfig);
const port = config.server_port + 1;
const host = config.server_host;
const serverOptions = {
	contentBase: 'http://' + host + ':' + port,
	quiet: true,
	noInfo: true,
	hot: true,
	inline: true,
	lazy: false,
	publicPath: webpackConfig.output.publicPath,
	headers: {'Access-Control-Allow-Origin': '*'},
	stats: {colors: true}
};
const app = express();

app.use(webpackDevMiddleware(compiler, serverOptions));
app.use(webpackHotMiddleware(compiler));

app.listen(port, function (err) {
	if (err) {
		console.error(err);
	} else {
		print(`==> 🚧  Webpack development server listening on port ${port}`);
	}
});
