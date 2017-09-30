import React from 'react';
import { connect } from 'react-redux';
import { Panel, Col, Row, Well, Button, ButtonGroup, Label, Modal } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { deleteCartItem, updateCart } from '../../actions/cartActions';

class Cart extends React.Component {

    constructor() {
        super();
        this.state = {
            showModal: false
        }
    }

    open = () => {
        this.setState({ showModal: true });
    }

    close = () => {
        this.setState({ showModal: false });
    }

    onDelete = (_id) => {
        const currentBookToDelete = this.props.cart;
        const indexToDelete = currentBookToDelete.findIndex(cart => {
            return cart._id === _id;
        });

        let cartAfterDelete = [...currentBookToDelete.slice(0, indexToDelete), ...currentBookToDelete.slice(indexToDelete + 1)];
        
        this.props.deleteCartItem(cartAfterDelete);
    }

    onIncrement = (_id) => {
        this.props.updateCart(_id, 1);
    }

    onDecrement = (_id, quantity) => {
        if (quantity > 1) {
            this.props.updateCart(_id, -1);
        }
    }

    renderCart = () => {
        const cartItemsList = this.props.cart.map(cartArr => {
            return (
                <Panel key={cartArr._id}>
                    <Row>
                        <Col xs={12} sm={4}>
                            <h6>{cartArr.title}</h6><span>    </span>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>usd. {cartArr.price}</h6>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>qty. <Label bsStyle="success">{cartArr.quantity}</Label></h6>
                        </Col>
                        <Col xs={6} sm={4}>
                            <ButtonGroup style={{minWidth: '300px'}}>
                                <Button onClick={() => this.onDecrement(cartArr._id, cartArr.quantity)} bsStyle='default' bsSize='small'>-</Button>
                                <Button onClick={() => this.onIncrement(cartArr._id)} bsStyle='default' bsSize='small'>+</Button>                                
                                <span>     </span>
                                <Button onClick={() => this.onDelete(cartArr._id)} bsStyle='danger' bsSize='small'>DELETE</Button>                                
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Panel>
            );
        });

        return (
            <Panel header="Cart" bsStyle="primary">
                {cartItemsList}
                <Row>
                    <Col xs={12}>
                        <h6>Total amount:{this.props.totalAmount}</h6>
                        <Button onClick={() => this.open()} bsSize='small' bsStyle='success'>PROCEED TO CHECKOUT</Button>
                    </Col>
                </Row>
                <Modal show={this.state.showModal} onHide={() => this.close()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thank you!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>Your order has been saved</h6>
                        <p>You will receive an email confirmation</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Col xs={6}>
                            <h6>Total $:{this.props.totalAmount}</h6>
                        </Col>
                        <Button onClick={() => this.close()}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Panel>
        );
    };

    renderEmpty = () => {
        return <div></div>;
    };

    render() {
        if (this.props.cart[0]) {
            return this.renderCart();
        } else {
            return this.renderEmpty();
        }
    }
}


function mapStateToProps(state) {
    return {
        cart: state.cart.cart,
        totalAmount: state.cart.totalAmount,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteCartItem: deleteCartItem,
        updateCart: updateCart
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);