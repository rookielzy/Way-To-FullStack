import React from 'react';
import Menu from './components/menu';
import Footer from './components/footer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCarts } from './actions/cartActions';

class Main extends React.Component {

    componentDidMount() {
        this.props.getCarts();
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <Menu cartItemsNumber={this.props.totalQty} />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        totalQty: state.cart.totalQty
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getCarts: getCarts
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);