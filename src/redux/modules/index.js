import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {fork} from 'redux-saga/effects';
import {reducer as counter, saga as watchCounterTriple} from './counter';

export const rootReducer = combineReducers({
	counter,
	routing
});

export function * rootSaga() {
	yield [
		fork(watchCounterTriple)
	];
}
