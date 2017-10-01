import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import reducers from './reducers/index';
import { addToCart } from './actions/cartActions';
import { postBooks, deleteBooks, updateBooks } from './actions/booksActions';
import BooksList from './components/pages/booksList';
import Menu from './components/menu';
import Footer from './components/footer';

// STEP 1 create the store
const middleware = applyMiddleware(logger);

const store = createStore(reducers, middleware);

render(
    <Provider store={store}>
        <div>
            <Menu />
            <BooksList />
            <Footer />
        </div> 
    </Provider>,
    document.getElementById('app')
    
);
