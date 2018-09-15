import React from 'react';
import { render } from 'react-dom';
import App from './components/App'
import registerServiceWorker from './registerServiceWorker';
import './css/style.css'

render(<App />, document.querySelector('#root'));
registerServiceWorker();
