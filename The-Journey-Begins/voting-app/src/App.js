import React, { Component } from 'react'
import Seed from './js/seed'

class ProductList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
    }

    this.handleProductUpVote = this.handleProductUpVote.bind(this)
  }

  componentDidMount() {
    this.setState({
      products: (new Seed()).products.sort((a, b) => b.votes - a.votes),
    })
  }

  handleProductUpVote(productId) {
    const nextProducts = this.state.products.map(product => {
      if (product.id === productId) {
        return Object.assign({}, product, {
          votes: product.votes + 1,
        })
      } else {
        return product
      }
    })
    this.setState({
      products: nextProducts,
    })
  }

  render() {
    const products = this.state.products.sort((a, b) => b.votes - a.votes)
    return (
      <div className="ui items">
        {
          products.map(product =>
            <Product
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              url={product.url}
              votes={product.votes}
              submitterAvatarUrl={product.submitterAvatarUrl}
              productImageUrl={product.productImageUrl}
              onVote={this.handleProductUpVote}
            />
          )
        }
      </div>
    )
  }
}

class Product extends React.Component {
  constructor(props) {
    super(props)
    this.handleUpVote = this.handleUpVote.bind(this)
  }
  handleUpVote() {
    this.props.onVote(this.props.id)
  }
  render() {
    return (
      <div className="item">
        <div className="image">
          <img src={this.props.productImageUrl} />
        </div>
        <div className="content">
          <a className="header">
            <i className="large caret up icon" onClick={this.handleUpVote}></i>
            {this.props.votes}
          </a>
          <div className="meta">
            <a>{this.props.title}</a>
          </div>
          <div className="description">
            <p>{this.props.description}</p>
          </div>
          <div className="extra">
            <span>Submitted by:</span>
            <img src={this.props.submitterAvatarUrl} className="ui avatar image" />
          </div>
        </div>
      </div>
    )
  }
}

export default ProductList;
