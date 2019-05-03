// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { ipcRenderer } from 'electron';
import Routes from './routes';

type Props = {
  store?: {},
  history?: {}
};

export default class Root extends Component<Props> {

	componentDidMount() {
		ipcRenderer.on('asynchronous-reply', this.loadFileListener);
		ipcRenderer.send('asynchronous-message', 'ping')
	}

	componentWillUnmount() {
		ipcRenderer.removeListener('asynchronous-reply', this.loadFileListener)
	}

	loadFileListener = (event, args) => {
		console.log(args);
	}

	render() {
		return (
			<Provider store={this.props.store}>
				<ConnectedRouter history={this.props.history}>
					<Routes />
				</ConnectedRouter>
			</Provider>
		);
	}
}
