import {createStore} from 'redux';
import getEnhancers from './enhancers';
import rootReducer from './rootReducer';

export default function configureStore({initialState = {}, history}) {
	const enhancers = getEnhancers(history);
	const store = createStore(rootReducer, initialState, enhancers);

	if (__DEV__ && module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./rootReducer', () => {
			const nextRootReducer = require('./rootReducer').default;
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}
