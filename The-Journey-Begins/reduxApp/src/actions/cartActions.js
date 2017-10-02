import axios from 'axios';

export function getCarts() {
    return function(dispatch) {
        axios.get('/api/cart')
            .then(function(res) {
                dispatch({type: "GET_CART", payload: res.data})
            })
            .catch(function(err) {
                dispatch({type: "GET_CART_REJECTED", msg: err})
            })
    }
}

export function addToCart(cart) {
    return function(dispatch) {
        axios.post('/api/cart', cart)
            .then(function(res) {
                dispatch({type: "ADD_TO_CART", payload: res.data});
            })
            .catch(function(err) {
                dispatch({type: "ADD_TO_CART_REJECTED", msg: err})
            })
    }
}

export function deleteCartItem(cart) {
    return function(dispatch) {
        axios.post('/api/cart', cart)
            .then(function(res) {
                dispatch({type: "DELETE_CART_ITEM", payload: res.data});
            })
            .catch(function(err) {
                dispatch({type: "DELETE_CART_ITEM_REJECTED", msg: err})
            })
    }
}

export function updateCart(_id, unit, cart) {
    const currentBookToUpdate = cart;
    const indexToUpdate = currentBookToUpdate.findIndex(book => {
        return book._id === _id;
    });

    const newBookToUpdate = {
        ...currentBookToUpdate[indexToUpdate],
        quantity: currentBookToUpdate[indexToUpdate].quantity + unit
    };

    let cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate + 1)];

    return function(dispatch) {
        axios.post('/api/cart', cartUpdate)
            .then(function(res) {
                dispatch({type: "UPDATE_CART", payload: res.data});
            })
            .catch(function(err) {
                dispatch({type: "UPDATE_CART_REJECTED", payload: err})
            })
    }
}