import {createAction, handleAction, handleActions} from 'redux-actions';

// ======================================== //
//     Constants
// ======================================== //

export const COUNTER_INCREMENT = '@@app/COUNTER_INCREMENT';

// ======================================== //
//     Actions
// ======================================== //

export const increment = createAction(COUNTER_INCREMENT, (amount = 1) => amount);

export const actions = {increment};

// ======================================== //
//     Actions Map
// ======================================== //

const ACTIONS_MAP = {
	[COUNTER_INCREMENT]: handleAction(COUNTER_INCREMENT, (state, action) => state + action.payload)
};

// ======================================== //
//     Reducer
// ======================================== //

export default handleActions(ACTIONS_MAP, 0);
