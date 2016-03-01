import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {fork} from 'redux-saga/effects';
import {reducer as counter, saga as watchCounterTriple} from './counter';

export const rootReducer = combineReducers({
	counter,
	routing
});

function rootSagaGenFac() {
	return function * rootSaga() {
		yield [
			fork(watchCounterTriple)
		];
	};
}
export const rootSaga = rootSagaGenFac();

// ======================================== //
//     API
// ======================================== //

export default {
	rootReducer: rootReducer,
	rootSaga: rootSagaGenFac()
};
