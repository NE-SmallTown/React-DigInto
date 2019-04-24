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
        <div>bar{this.props.prop}</div>
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
      setTimeout(() => {
        // debugger
        this.setState({
          show: true
        });
      }, 2000);
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
          <Bar prop={222}>!!!</Bar>
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <div id="my-root-container">
      <Foo id="fooComponent">
        <div>children1</div>
      </Foo>
    </div>,
    el,
  );
  //
  // console.log(1111);
  // describe('Message Test', function () {
  //   console.log(2222);
  //   it('Message Test it', function (done) {
  //     console.log(3333);
  //     setTimeout(() => {
  //       // let inst = document.querySelector('#div');
  //       // let childNodes = inst.childNodes;
  //       // let childDiv = childNodes[1];
  //       console.log(4444);
  //
  //       ReactDOM.render(
  //         <Foo>
  //           <span>children2</span>
  //           <span>children22</span>
  //         </Foo>,
  //         el,
  //       );
  //       console.log(11111, el.textContent);
  //       // childNodes = inst.childNodes;
  //       // expect(childNodes.length).toBe(1);
  //       // expect(childNodes[0]).toBe(childDiv);
  //
  //       ReactDOM.render(
  //         <Foo>
  //           <span>children3</span>
  //           <p>children33</p>
  //         </Foo>,
  //         el,
  //       );
  //       console.log(22222, el.textContent);
  //       // childNodes = inst.childNodes;
  //       // expect(childNodes.length).toBe(3);
  //       // expect(childNodes[0].data).toBe('foo');
  //       // expect(childNodes[1]).toBe(childDiv);
  //       // expect(childNodes[2].data).toBe('bar');
  //       done();
  //     }, 2000);
  //   });
  // });
}

console.log('%c Test file end!', 'font-size: 20px; color: blue');
