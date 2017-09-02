import React, { Component } from 'react'
import Seed from './js/seed'

class ProductList extends React.Component {
  render() {
    const seed = new Seed()
    const products = seed.products
    // console.log(products.products, products.products[0].votes())
    return (
      <div className="ui items">
        <Product
          id={products[0].id}
          title={products[0].title}
          description={products[0].description}
          url={products[0].url}
          votes={products[0].votes}
          submitterAvatarUrl={products[0].submitterAvatarUrl}
          productImageUrl={products[0].productImageUrl}
        />
      </div>
    )
  }
}

class Product extends React.Component {
  render() {
    return (
      <div className="item">
        <div className="image">
          <img src={this.props.productImageUrl} />
        </div>
        <div className="content">
          <a className="header">
            <i className="large caret up icon"></i>
            {this.props.votes()}
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
