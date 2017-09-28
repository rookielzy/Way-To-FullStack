import { createStore } from 'redux';

// STEP 3 define reducers
const reducer = (state=0, action) => {
    switch(action.type) {
        case "POST_BOOK":
            return state = action.payload;
            break;
    }
    return state;
}

// STEP 1 create the store
const store = createStore(reducer);

store.subscribe(() => {
    console.log('current state is: ', store.getState());
    console.log('current price is: ', store.getState().price);    
});

// STEP 2 create and dispatch actions
store.dispatch({
    type: "POST_BOOK",
    payload: {
        id: 1,
        title: 'This is the book title',
        description: 'This is the book description',
        price: 24
    }
});