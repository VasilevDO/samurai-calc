import React from 'react';
import {createRoot} from 'react-dom/client';
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

const container = document.getElementById('root');
const root = createRoot(container); // CreateRoot(container!) if you use TypeScript
root.render(app);
