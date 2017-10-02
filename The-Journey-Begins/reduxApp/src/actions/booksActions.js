import axios from 'axios';

// GET A BOOK
export function getBooks() {
    return {
        type: "GET_BOOKS"
    }
}

// POST A BOOK
export function postBooks(book) {
    return function(dispatch) {
        axios.post("/books", book)
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
    return {
        type: "DELETE_BOOK",
        payload: _id
    }
}

// UPDATE A BOOK
export function updateBooks(book) {
    return {
        type: "UPDATE_BOOK",
        payload: book
    }
}