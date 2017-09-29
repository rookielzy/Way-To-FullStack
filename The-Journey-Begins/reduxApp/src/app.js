import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import reducers from './reducers/index';
import { addToCart } from './actions/cartActions';
import { postBooks, deleteBooks, updateBooks } from './actions/booksActions';
import BooksList from './components/pages/booksList';

// STEP 1 create the store
const middleware = applyMiddleware(logger);

const store = createStore(reducers, middleware);


// STEP 2 create and dispatch actions
// store.dispatch(postBooks(
//     {
//         type: "POST_BOOK",
//         payload: [
//             {
//                 id: 1,
//                 title: 'This is the book title',
//                 description: 'This is the book description',
//                 price: 24
//             },
//             {
//                 id: 2,
//                 title: 'This is the second book title',
//                 description: 'This is the second book description',
//                 price: 40
//             }
//         ]
//     }
// ));

render(
    <Provider store={store}>
        <BooksList />
    </Provider>,
    document.getElementById('app')
    
);
