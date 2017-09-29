import { createStore } from 'redux';

// STEP 3 define reducers
const reducer = (state={books:[]}, action) => {
    switch(action.type) {
        case "POST_BOOK":
            let books = state.books.concat(action.payload);
            return {books};
            break;

        case "DELETE_BOOK":
            const currentBookToDelete = [...state.books];
            const indexToDelete = currentBookToDelete.findIndex(book => {
                return book.id === action.payload.id;
            });

            return {books: [...currentBookToDelete.slice(0, indexToDelete), ...currentBookToDelete.slice(indexToDelete + 1)]};
            break;

        case "UPDATE_BOOK":
            const currentBookToUpdate = [...state.books];
            const indexToUpdate = currentBookToUpdate.findIndex(book => {
                return book.id === action.payload.id;
            });

            const newBookToUpdate = {
                ...currentBookToUpdate[indexToUpdate],
                title: action.payload.title
            };

            console.log('What is it newBookToUpdate ', newBookToUpdate);

            return {books: [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate + 1)]};
            break;
    }
    return state;
}

// STEP 1 create the store
const store = createStore(reducer);

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