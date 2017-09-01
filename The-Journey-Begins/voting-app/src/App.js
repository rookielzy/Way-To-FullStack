import React, { Component } from 'react';

class ProductList extends React.Component {
  render() {
      return (
          <div className="ui unstackable items">
              <Product />
          </div>
      )
  }
}

class Product extends React.Component {
  render() {
    return (
      <div>
        <div className="item">
          <div className="ui small image">
            <img src="images/products/image-aqua.png" />
          </div>
          <div className="middle aligned content">
            <div className="description">
              <a>Fort Knight</a>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias ipsam quidem doloribus vitae tempore dolore?</p>
            </div>
            <div className="extra">
              <span>Submitted by:</span>
              <img src="images/avatars/daniel.jpg" className="ui avatar image" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductList;
