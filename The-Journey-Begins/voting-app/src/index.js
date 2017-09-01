import React from 'react';
import ReactDOM from 'react-dom';
import ProductList from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ProductList />, document.getElementById('content'));
registerServiceWorker();
