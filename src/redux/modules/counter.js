import {createAction, handleAction, handleActions} from 'redux-actions';
import {takeEvery} from 'redux-saga';
import {put, select} from 'redux-saga/effects';

// ======================================== //
//     Constants
// ======================================== //

const COUNTER_INCREMENT = '@@app/COUNTER_INCREMENT';
const COUNTER_DECREMENT = '@@app/COUNTER_DECREMENT';
const COUNTER_TRIPLE = '@@app/COUNTER_TRIPLE';

// ======================================== //
//     State helpers
// ======================================== //

const getCounter = (state) => state.get('counter');

// ======================================== //
//     Actions
// ======================================== //

const increment = createAction(COUNTER_INCREMENT, (amount = 1) => amount);
const decrement = createAction(COUNTER_DECREMENT, (amount = 1) => amount);
const triple = createAction(COUNTER_TRIPLE);
const actions = {increment, decrement, triple};

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

const reducer = handleActions(ACTIONS_MAP, 0);

// ======================================== //
//     Saga
// ======================================== //

function * counterTriple() {
	let counter = yield select(getCounter);
	yield put(increment(counter * 2));
}

function * saga() {
	while (true) { // eslint-disable-line no-constant-condition
		yield * takeEvery(COUNTER_TRIPLE, counterTriple);
	}
}

// ======================================== //
//     API
// ======================================== //

const api = {
	COUNTER_INCREMENT,
	COUNTER_DECREMENT,
	COUNTER_TRIPLE,
	getCounter,
	increment,
	decrement,
	triple,
	actions,
	reducer,
	saga
};

export default api;
