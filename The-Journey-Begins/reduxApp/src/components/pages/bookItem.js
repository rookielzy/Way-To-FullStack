import React from 'react';
import { Col, Row, Well, Button, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToCart, updateCart } from '../../actions/cartActions';

class BookItem extends React.Component {

    constructor() {
        super();
        this.state = {
            isClick: false
        };
    }

    onReadMore = () => {
        this.setState({
            isClick: true
        })
    }

    handleCart = () => {
        const book = [...this.props.cart, {
            _id: this.props._id,
            title: this.props.title,
            description: this.props.description,
            images: this.props.images,
            price: this.props.price,
            quantity: 1,
        }];

        if (this.props.cart.length > 0) {
            let _id = this.props._id;

            let cartIndex = this.props.cart.findIndex(cart => {
                return cart._id === _id;
            });

            if (cartIndex === -1) {
                this.props.addToCart(book);
            } else {
                this.props.updateCart(_id, 1, this.props.cart);
            }
        } else {
            this.props.addToCart(book);
        }
    }

    render() {
        console.log('image image image', this.props);
        return (
            <Well>
                <Row>
                    <Col xs={12} sm={4}>
                        <Image src={this.props.images} responsive />
                    </Col>
                    <Col xs={6} sm={8}>
                        <h6>{this.props.title}</h6>
                        <p>{(this.props.description.length > 50 && this.state.isClick === false) ? (this.props.description.substring(0, 50)) : (this.props.description)}
                            <button className="link" onClick={() => this.onReadMore()}>
                                {(this.state.isClick === false && this.props.description !== null && this.props.description.length > 50) ? ("...read more") : ""}
                            </button>
                        </p>
                        <h6>usd. {this.props.price}</h6>
                        <Button onClick={() => this.handleCart()} bsStyle="primary">Buy Now</Button>
                    </Col>
                </Row>
            </Well>
        );
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart.cart
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addToCart: addToCart,
        updateCart: updateCart
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookItem);