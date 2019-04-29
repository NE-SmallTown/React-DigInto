/**
 * v0.0.1
 *
 * Copyright (c) 2017
 */
import React from 'react';
import ReactDOM from 'react-dom';

console.log('%c Test file start!', 'font-size: 20px; color: blue');

export default function main () {
  const el = document.querySelector('#root-tests');
  // TODO 异步的更新可以用 Demo (http://timeslicing-unstable-demo.surge.sh/)
  
  class Bar extends React.Component {
    render () {
      return (
        <div>bar {this.props.prop + ''}</div>
      );
    }
  }
  
  class Foo extends React.Component {
    state = { show: false };
    
    componentDidMount () {
      // this.setState(state => ({ foo: '22' }), () => {
      //   console.log('setState callback!!!!');
      // });

      // debugger
      console.log('componentDidMount');
      setTimeout(() => {
        // debugger
        this.setState({
          show: true
        });
      }, 3000);
    }
    
    componentDidUpdate () {
      console.log('componentDidUpdate');
    }
    
    render () {
      return (
        <div className="foo-root">
          <p>foo</p>
          {this.state.show && <div>show</div>}
          {this.props.children}
          <Bar prop={this.state.show}>!!!</Bar>
        </div>
      );
    }
  }

  debugger;
  ReactDOM.render(
    <div id="my-root-container">
      <Foo id="notC">
        <div>no mode</div>
      </Foo>
      
      <div>-------------------------- divider ------------------------------</div>
      
      <React.unstable_ConcurrentMode>
        <Foo id="C">
          <div>unstable_ConcurrentMode</div>
        </Foo>
      </React.unstable_ConcurrentMode>
    </div>,
    el,
  );
}

console.log('%c Test file end!', 'font-size: 20px; color: blue');
