import {combineReducers} from 'redux';
import {routeReducer as routing} from 'react-router-redux';
import counter from './modules/counter';

export default combineReducers({
	counter,
	routing
});
