import React from 'react';
import { Well, Panel, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';
import { postBooks, deleteBooks } from '../../actions/booksActions';


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

    onDelete = () => {
        let bookId = findDOMNode(this.refs.delete).value;

        this.props.deleteBooks(bookId);
    }

    render() {

        const booksList = this.props.books.map(book => {
            return (
                <option key={book._id}>{book._id}</option>
            );
        });

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
                <Panel style={{marginTop: '25px'}}>
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Select a book id to delete</ControlLabel>
                        <FormControl ref='delete' componentClass="select" placeholder="select">
                            <option value="select">select</option>
                            {booksList}
                        </FormControl>
                    </FormGroup>
                    <Button onClick={() => this.onDelete()} bsStyle='danger'>Delete Book</Button>
                </Panel>
            </Well>
        );
    }
}

function mapStateToProps(state) {
    return {
        books: state.books.books
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({postBooks, deleteBooks}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksFrom);