/**
 * HomeView
 */
import React, {Component} from 'react';
import {Link} from 'react-router';

export class HomeView extends Component {
	render() {
		return (
			<div className="container text-center home">
				<h1>This is a demo home page!</h1>
				<hr />
				<Link to="/404">See 404 page</Link>
			</div>
		);
	}
}

export default HomeView;
