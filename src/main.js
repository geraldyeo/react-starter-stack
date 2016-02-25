import React from 'react';
import ReactDOM from 'react-dom';
import {useRouterHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {createHistory} from 'history';
import makeRoutes from './routes';
import Root from './containers/Root';
import configureStore from './redux/configureStore';

const initialState = window.__DATA__;
const historyConfig = {basename: __BASENAME__};
const routerHistory = useRouterHistory(createHistory)(historyConfig);
const store = configureStore({initialState, history: routerHistory});
const history = syncHistoryWithStore(routerHistory, store);
const routes = makeRoutes(store);

// Render the React application to the DOM
ReactDOM.render(
	<Root history={history} routes={routes} store={store}/>,
	document.getElementById('root')
);
