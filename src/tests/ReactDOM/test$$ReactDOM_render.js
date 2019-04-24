/**
 * v0.0.1
 *
 * Copyright (c) 2017
 */

import React from 'react';
import ReactDOM from 'react-dom';

console.log('%c test$$ReactDOM_render %c start!', 'font-size: 20px; color: blue', 'color: green; font-size: 30px');

export default function main () {
  class Child extends React.Component {
    constructor (props) {
      super(props);

      this.state = { childFoo: 'child_foo' };
    }

    render () {
      return (
        <h3
          onClick={() => { this.setState({ childFoo : 'child_foo_updated' }); }}
        >
            Click Child! {this.state.childFoo}
        </h3>
      );
    }
  }

  class Parent extends React.Component {
    constructor (props) {
      super(props);

      this.state = { parentFoo: 'parent_foo' };
    }

    /* componentDidMount () {
      fetch('')
      .then(res => res.json())
      .then(data => {
        console.log(data);

        this.setState({
          foo: data.data.qq
        });
      });
    } */

    render () {
      return (
        <div onClick={() => { this.setState({ parentFoo: 'parent_foo_updated' }); }}>
          <h1>Parent! {this.state.parentFoo}</h1>

          <div>-----------------------------------</div>

          <Child />
        </div>
      );
    }
  }

  ReactDOM.render(<Parent />, document.getElementById('root-tests'));
}

console.log('%c test$$ReactDOM_render %c end!', 'font-size: 20px; color: blue', 'color: green; font-size: 30px');
