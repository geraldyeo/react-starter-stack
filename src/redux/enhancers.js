import {applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';

export default function getEnhancers(history) {
	let enhancers = applyMiddleware(thunk, routerMiddleware(history));

	if (__CLIENT__) {
		if (__DEV__ && __DEBUG__) {
			const devTools = window.devToolsExtension ?
				window.devToolsExtension() :
				require('containers/DevTools').default.instrument();
			enhancers = compose(enhancers, devTools);
		}
	}

	return enhancers;
}
