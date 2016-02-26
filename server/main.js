import Koa from 'koa';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import {createMemoryHistory, match, RouterContext} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import debug from 'debug';
import config from '../config';
import configureStore from '../src/redux/configureStore';
import routes from '../src/routes';
import Html from '../src/containers/Html';

const print = debug('app:server');
const port = config.server_port;
const host = config.server_host;
const app = new Koa();

app.use(async ctx => {
	if (__DEV__) {
		webpackIsomorphicTools.refresh();
	}

	const memoryHistory = createMemoryHistory(ctx.path);
	const store = configureStore({history: memoryHistory});
	const history = syncHistoryWithStore(memoryHistory, store);

	const hydrateOnClient = () => {
		const content = renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>);
		ctx.body = `<!doctype html>\n${content}`;
	};

	if (__NO_SSR__) {
		hydrateOnClient();
		return;
	}

	match({history, routes, location: ctx.url}, (error, redirectLocation, renderProps) => {
		if (error) {
			ctx.status = 500;
			hydrateOnClient();
		} else if (redirectLocation) {
			ctx.redirect(redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps) {
			const component = (
				<Provider store={store}>
					<RouterContext {...renderProps}/>
				</Provider>
			);

			ctx.status = 200;
			ctx.body = `<!doctype html>\n${renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>)}`;
		} else {
			ctx.status = 404;
			hydrateOnClient();
		}
	});
});

// ======================================== //
//     Server
// ======================================== //
if (port) {
	app.listen(port, err => {
		if (err) {
			console.error(err);
		}
		print(`==> 💻  Open http://${host}:${port} in a browser to view the app.`);
	});
} else {
	console.error('ERROR: No PORT environment variable has been specified');
}

export default app;
