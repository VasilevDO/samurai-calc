import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';

import './index.scss';

import store from './redux/store';

import App from './App';

const app = (
	<React.StrictMode>
		<Provider store={store}>
			<App/>
		</Provider>
	</React.StrictMode>
);

ReactDom.render(app, document.querySelector('#root'));
