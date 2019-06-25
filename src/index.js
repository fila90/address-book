import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.scss';
import Router from './Router'
import store from './store'

ReactDOM.render(<Router appStore={store} />, document.getElementById('root'));
