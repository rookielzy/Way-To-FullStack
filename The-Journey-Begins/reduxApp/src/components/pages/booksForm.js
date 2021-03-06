import React from 'react';
import { Well, Panel, FormGroup, FormControl, ControlLabel, Button, InputGroup, DropdownButton, Image, Col, Row, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';
import axios from 'axios';
import { postBooks, deleteBooks, getBooks, resetButton } from '../../actions/booksActions';


class BooksFrom extends React.Component {

    constructor() {
        super();
        this.state = {
            images: [{}],
            img: ''
        }
    }

    componentDidMount() {
        this.props.getBooks();
        // GET IMAGES FROM API
        axios.get('/api/images')
            .then(function(res) {
                this.setState({images: res.data});
            }.bind(this))
            .catch(function(err) {
                this.setState({images: "error loading image file from the server", img: ''});
            }.bind(this))
    }

    handleSubmit = () => {
        const book=[{
            title: findDOMNode(this.refs.title).value,
            description: findDOMNode(this.refs.description).value,
            images: findDOMNode(this.refs.images).value,
            price: findDOMNode(this.refs.price).value,
        }];
        this.props.postBooks(book);
        console.log('submit success');
    }

    onDelete = () => {
        let bookId = findDOMNode(this.refs.delete).value;

        this.props.deleteBooks(bookId);
    }

    handeSelect = (imgName) => {
        this.setState({
            img: '/images/' + imgName
        })
    }
    
    resetForm = () => {

        this.props.resetButton();

        findDOMNode(this.refs.title).value = '';
        findDOMNode(this.refs.description).value = '';
        findDOMNode(this.refs.price).value = '';
        this.setState({
            img: ''
        })
    }

    render() {
        console.log(this.props.books);
        const booksList = this.props.books.map(book => {
            return (
                <option key={book._id}>{book._id}</option>
            );
        });

        const imgList = this.state.images.map((img, index) => {
            return (
                <MenuItem key={index} eventKey={img.name} onClick={() => this.handeSelect(img.name)} >{img.name}</MenuItem>
            );
        });

        return (
            <Well>
                <Row>
                    <Col xs={12} sm={6}>
                        <Panel>
                            <InputGroup>
                                <FormControl type="text" ref="images" value={this.state.img} />
                                <DropdownButton
                                    componentClass={InputGroup.Button}
                                    id="input-dropdown-addon"
                                    title="Select an image"
                                    bsStyle="primary"
                                >
                                    {imgList}
                                </DropdownButton>
                            </InputGroup>
                            <Image src={this.state.img} responsive />
                        </Panel>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Panel>
                            <FormGroup controlId="title" validationState={this.props.validation}>
                                <ControlLabel>Title</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter Title"
                                    ref="title"
                                />
                                <FormControl.Feedback />
                            </FormGroup>
                            <FormGroup controlId="description" validationState={this.props.validation}>
                                <ControlLabel>Description</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter Description"
                                    ref="description"
                                />
                                <FormControl.Feedback />
                            </FormGroup>
                            <FormGroup controlId="price" validationState={this.props.validation}>
                                <ControlLabel>Price</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter Price"
                                    ref="price"
                                />
                                <FormControl.Feedback />
                            </FormGroup>
                            <Button
                                onClick={(!this.props.msg) ? (() => this.handleSubmit()) : (() => this.resetForm())}
                                bsStyle={(!this.props.msg) ? ("primary") : (this.props.style)}
                            >
                                {!(this.props.msg) ? ("Save Book") : (this.props.msg)}
                            </Button>
                        </Panel>
                        <Panel style={{ marginTop: '25px' }}>
                            <FormGroup controlId="formControlsSelect">
                                <ControlLabel>Select a book id to delete</ControlLabel>
                                <FormControl ref='delete' componentClass="select" placeholder="select">
                                    <option value="select">select</option>
                                    {booksList}
                                </FormControl>
                            </FormGroup>
                            <Button onClick={() => this.onDelete()} bsStyle='danger'>Delete Book</Button>
                        </Panel>
                    </Col>
                </Row>
            </Well>
        );
    }
}

function mapStateToProps(state) {
    return {
        books: state.books.books,
        msg: state.books.msg,
        style: state.books.style,
        validation: state.books.validation
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({postBooks, deleteBooks, getBooks, resetButton}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksFrom);