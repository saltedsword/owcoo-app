import React from 'react';
import { render } from 'react-dom'
import './index.css';
import { browserHistory, Router } from 'react-router'
import routes from './routes/routes';
import registerServiceWorker from './registerServiceWorker';

render(<Router routes={routes} history={browserHistory}/>, document.getElementById('root'));
registerServiceWorker();
