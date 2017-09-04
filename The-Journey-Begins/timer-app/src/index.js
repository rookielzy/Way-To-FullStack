import React from 'react';
import ReactDOM from 'react-dom';
import TimerDashboard from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<TimerDashboard />, document.getElementById('content'));
registerServiceWorker();
