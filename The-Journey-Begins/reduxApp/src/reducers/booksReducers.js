// BOOKS REDUCERS
export function booksReducers(state = { books: [] }, action) {
    switch (action.type) {
        case "POST_BOOK":
            let books = state.books.concat(action.payload);
            return { books };
            break;

        case "DELETE_BOOK":
            const currentBookToDelete = [...state.books];
            const indexToDelete = currentBookToDelete.findIndex(book => {
                return book.id === action.payload.id;
            });

            return { books: [...currentBookToDelete.slice(0, indexToDelete), ...currentBookToDelete.slice(indexToDelete + 1)] };
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

            return { books: [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate + 1)] };
            break;
    }
    return state;
}
