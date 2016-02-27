import {createAction, handleAction, handleActions} from 'redux-actions';

// ======================================== //
//     Constants
// ======================================== //

export const COUNTER_INCREMENT = '@@app/COUNTER_INCREMENT';
export const COUNTER_DECREMENT = '@@app/COUNTER_DECREMENT';

// ======================================== //
//     Actions
// ======================================== //

export const increment = createAction(COUNTER_INCREMENT, (amount = 1) => amount);
export const decrement = createAction(COUNTER_DECREMENT, (amount = 1) => amount);

export const actions = {increment, decrement};

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

export default handleActions(ACTIONS_MAP, 0);
