import React from 'react';
import { Well, Panel, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';
import { postBooks } from '../../actions/booksActions';


class BooksFrom extends React.Component {

    handleSubmit = () => {
        const book=[{
            _id: Math.random(),
            title: findDOMNode(this.refs.title).value,
            description: findDOMNode(this.refs.description).value,
            price: findDOMNode(this.refs.price).value,
        }];
        this.props.postBooks(book);
        console.log('submit success');
    }

    render() {
        return (
            <Well>
                <Panel>
                    <FormGroup>
                        <ControlLabel>Title</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter Title"
                            ref="title"
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Description</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter Description"
                            ref="description"
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Price</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter Price"
                            ref="price"
                        />
                    </FormGroup>
                    <Button onClick={() => this.handleSubmit()} bsStyle="primary">Save Book</Button>
                </Panel>
            </Well>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({postBooks}, dispatch);
}

export default connect(null, mapDispatchToProps)(BooksFrom);