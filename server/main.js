import Koa from 'koa';
import React from 'react';
import {renderToString} from 'react-dom/server';
// import {RouterContext, match} from 'react-router';
import debug from 'debug';
import config from '../config';
import configureStore from '../src/redux/configureStore';
import Html from '../src/containers/Html';

const print = debug('app:server');
const port = config.server_port;
const host = config.server_host;
const app = new Koa();

app.use(async ctx => {
	if (__DEV__) {
		webpackIsomorphicTools.refresh();
	}

	const store = configureStore({});

	const hydrateOnClient = () => {
		const content = renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>);
		ctx.body = `<!doctype html>\n${content}`;
	};

	if (__NO_SSR__) {
		hydrateOnClient();
		return;
	}

	hydrateOnClient();
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
