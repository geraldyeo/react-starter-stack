import {createStore} from 'redux';
import getEnhancers from './enhancers';
import {rootReducer} from './modules';

export default function configureStore({initialState = {}, history}) {
	const enhancers = getEnhancers(history);
	const store = createStore(rootReducer, initialState, enhancers);

	if (__DEV__ && module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./modules', () => {
			const nextRootReducer = require('./modules').rootReducer;
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}
