import axios from 'axios';

// GET A BOOK
export function getBooks() {
    return function(dispatch) {
        axios.get('/api/books')
            .then(function(res) {
                dispatch({type: "GET_BOOKS", payload: res.data});
            })
            .catch(function(err) {
                dispatch({type: "GET_BOOKS_REJECTED", payload: err})
            })
    }
}

// POST A BOOK
export function postBooks(book) {
    return function(dispatch) {
        axios.post("/api/books", book)
            .then(function(res) {
                dispatch({type: "POST_BOOK", payload: res.data});
                console.log("success post book");
            })
            .catch(function(err) {
                dispatch({type: "POST_BOOK_REJECTED", payload: "There was an error while posting a new book"});
            })
    }
}

// DELETE A BOOK
export function deleteBooks(_id) {
    return function(dispatch) {
        axios.delete('/api/books/' + _id)
            .then(function(res) {
                dispatch({type: "DELETE_BOOK", payload: _id});
            })
            .catch(function(err) {
                dispatch({type: "DELETE_BOOK_REJECTED", payload: err});
            })
    }
}

// UPDATE A BOOK
export function updateBooks(book) {
    return {
        type: "UPDATE_BOOK",
        payload: book
    }
}