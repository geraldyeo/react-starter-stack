import {createStore} from 'redux';
import getEnhancers from './enhancers';
import rootReducer from './rootReducer';

export default function configureStore({initialState = {}, history}) {
	const {routerMiddleware, enhancers} = getEnhancers(history);
	const store = createStore(rootReducer, initialState, enhancers);

	// Required for replaying actions from devtools to work
	if (__DEV__ && __CLIENT__ && __DEBUG__) {
		routerMiddleware.listenForReplays(store);
	}

	if (__DEV__ && module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./rootReducer', () => {
			const nextRootReducer = require('./rootReducer').default;
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}
