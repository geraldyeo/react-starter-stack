/**
 * HomeView
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {actions as counterActions} from '../../redux/modules/counter';
import classes from './HomeView.styl';

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
	counter: state.counter
});

export class HomeView extends Component {
	static propTypes = {
		counter: PropTypes.number.isRequired,
		increment: PropTypes.func.isRequired,
		decrement: PropTypes.func.isRequired,
		triple: PropTypes.func.isRequired
	};

	handleClick = (e) => {
		const el = e.target;
		if (el.classList.contains('increment')) {
			this.props.increment(1);
		} else if (el.classList.contains('decrement')) {
			this.props.decrement(1);
		} else if (el.classList.contains('triple')) {
			this.props.triple();
		}
	}

	render() {
		return (
			<div className="container text-center home">
				<h1>Welcome to the React Starter Stack</h1>
				<h2>
					Sample Counter:
					{' '}
					<span className={classes['counter--green']}>{this.props.counter}</span>
				</h2>
				<button className="btn btn-default triple"
					onClick={this.handleClick}
					>
					*3
				</button>
				<button className="btn btn-default increment"
					onClick={this.handleClick}
					>
					+
				</button>
				<button className="btn btn-default decrement"
					onClick={this.handleClick}
					>
					-
				</button>
				<hr/>
				<Link to="/404">See 404 page</Link>
			</div>
		);
	}
}

export default connect(mapStateToProps, counterActions)(HomeView);
