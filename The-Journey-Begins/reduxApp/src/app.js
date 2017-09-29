import { createStore } from 'redux';
import reducers from './reducers/index';

// STEP 1 create the store
const store = createStore(reducers);

store.subscribe(() => {
    console.log('current state is: ', store.getState());
    // console.log('current price is: ', store.getState()[1].price);    
});

// STEP 2 create and dispatch actions
store.dispatch({
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
});

store.dispatch({
    type: "DELETE_BOOK",
    payload: {id: 1}
});

store.dispatch({
    type: "UPDATE_BOOK",
    payload: {
        id: 2,
        title: "Update the book Title"
    }
})