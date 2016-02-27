import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {fork} from 'redux-saga/effects';
import {reducer as counter, saga as watchCounterTriple} from './counter';

const rootReducer = combineReducers({
	counter,
	routing
});

function * rootSaga() {
	yield [
		fork(watchCounterTriple)
	];
}

// ======================================== //
//     API
// ======================================== //

const api = {
	rootReducer,
	rootSaga
};

export default api;
