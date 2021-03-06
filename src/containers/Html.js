/* eslint-disable react/no-danger */
import serialize from 'serialize-javascript';
import React, {Component, PropTypes} from 'react';
import {renderToString} from 'react-dom/server';
import Helmet from 'react-helmet';

export default class Html extends Component {
	static propTypes = {
		assets: PropTypes.object,
		component: PropTypes.node,
		store: PropTypes.object
	};

	render() {
		const {assets, component, store} = this.props;
		const content = component ? renderToString(component) : '';
		const head = Helmet.rewind();

		return (
			<html>
				<head>
					{head && head.base.toComponent()}
					{head && head.title.toComponent()}
					{head && head.meta.toComponent()}
					{head && head.link.toComponent()}
					{head && head.script.toComponent()}

					<meta name="viewport" content="width=device-width, initial-scale=1"/>
				</head>
				<body>
					<div id="root" dangerouslySetInnerHTML={{__html: content}}/>
					<script dangerouslySetInnerHTML={{__html: `window.__DATA__=${serialize(store.getState())};`}} charSet="UTF-8"/>
					<script src={assets.javascript.vendor} charSet="UTF-8"/>
					<script src={assets.javascript.app} charSet="UTF-8"/>
				</body>
			</html>
		);
	}
}
