import Koa from 'koa';
import React from 'react';
import {renderToString} from 'react-dom/server';
// import {RouterContext, match} from 'react-router';
import {useRouterHistory} from 'react-router';
import {createHistory} from 'history';
import debug from 'debug';
import config from '../config';
import configureStore from '../src/redux/configureStore';
import Html from '../src/containers/Html';

const print = debug('app:server');
const port = config.server_port;
const host = config.server_host;
const app = new Koa();

app.use(function *() {
	if (__DEV__) {
		webpackIsomorphicTools.refresh();
	}

	const historyConfig = {basename: __BASENAME__};
	const history = useRouterHistory(createHistory)(historyConfig);
	const store = configureStore({history});

	function hydrateOnClient() {
		this.request.send('<!doctype html>\n' + renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
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
