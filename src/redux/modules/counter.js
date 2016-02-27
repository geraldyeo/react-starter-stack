import {createAction, handleAction, handleActions} from 'redux-actions';
import {takeEvery} from 'redux-saga';
import {put, select} from 'redux-saga/effects';

// ======================================== //
//     Constants
// ======================================== //

export const COUNTER_INCREMENT = '@@app/COUNTER_INCREMENT';
export const COUNTER_DECREMENT = '@@app/COUNTER_DECREMENT';
export const COUNTER_TRIPLE = '@@app/COUNTER_TRIPLE';

// ======================================== //
//     State helpers
// ======================================== //

export const getCounter = (state) => state.get('counter');

// ======================================== //
//     Actions
// ======================================== //

export const increment = createAction(COUNTER_INCREMENT, (amount = 1) => amount);
export const decrement = createAction(COUNTER_DECREMENT, (amount = 1) => amount);
export const triple = createAction(COUNTER_TRIPLE);

export const actions = {increment, decrement, triple};

// ======================================== //
//     Actions Map
// ======================================== //

const ACTIONS_MAP = {
	[COUNTER_INCREMENT]: handleAction(COUNTER_INCREMENT, (state, action) => state + action.payload),
	[COUNTER_DECREMENT]: handleAction(COUNTER_DECREMENT, (state, action) => state - action.payload)
};

// ======================================== //
//     Reducer
// ======================================== //

export const reducer = handleActions(ACTIONS_MAP, 0);

// ======================================== //
//     Saga
// ======================================== //

export function * counterTriple() {
	let counter = yield select(getCounter);
	yield put(increment(counter * 2));
}

export function * watchCounterTriple() {
	while (true) { // eslint-disable-line no-constant-condition
		yield * takeEvery(COUNTER_TRIPLE, counterTriple);
	}
}

// ======================================== //
//     API
// ======================================== //

export default {
	reducer,
	saga: watchCounterTriple
};
