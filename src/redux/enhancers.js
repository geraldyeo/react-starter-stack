import {applyMiddleware, compose} from 'redux';
import {syncHistory} from 'react-router-redux';
import thunk from 'redux-thunk';

export default function getEnhancers(history) {
	let enhancers = applyMiddleware(thunk);
	let routerMiddleware;

	if (__CLIENT__) {
		routerMiddleware = syncHistory(history);
		enhancers = compose(enhancers, applyMiddleware(routerMiddleware));

		if (__DEV__ && __DEBUG__) {
			const devTools = window.devToolsExtension ?
				window.devToolsExtension() :
				require('containers/DevTools').default.instrument();
			enhancers = compose(enhancers, devTools);
		}
	}

	return {
		routerMiddleware,
		enhancers
	};
}
