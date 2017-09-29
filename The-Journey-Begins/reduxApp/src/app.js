import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import React from 'react';
import { render } from 'react-dom';
import reducers from './reducers/index';
import { addToCart } from './actions/cartActions';
import { postBooks, deleteBooks, updateBooks } from './actions/booksActions';
import BooksList from './components/pages/booksList';

// STEP 1 create the store
const middleware = applyMiddleware(logger);

const store = createStore(reducers, middleware);

// store.subscribe(() => {
    // console.log('current state is: ', store.getState());
    // console.log('current price is: ', store.getState()[1].price);    
// });

render(<BooksList />, document.getElementById('app'));

// STEP 2 create and dispatch actions
store.dispatch(postBooks(
    {
        type: "POST_BOOK",
        payload: [
            {
                id: 1,
                title: 'This is the book title',
                description: 'This is the book description',
                price: 24
            },
            {
                id: 2,
                title: 'This is the second book title',
                description: 'This is the second book description',
                price: 40
            }
        ]
    }
));

store.dispatch(deleteBooks(
    {
        type: "DELETE_BOOK",
        payload: {id: 1}
    }
));

store.dispatch(updateBooks(
    {
        type: "UPDATE_BOOK",
        payload: {
            id: 2,
            title: "Update the book Title"
        }
    }
));

// CART ACTIONS
// ADD to Cart
store.dispatch(addToCart([{id: 1}]));