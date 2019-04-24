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
  
  // TODO 改成组件而不是 div，不要用 ReactDOM.render 而是组件自己 setState
  // 异步的更新可以用 Demo (http://timeslicing-unstable-demo.surge.sh/)
  ReactDOM.render(
    <div id="div">
      {'foo'}
      <div />
      {'bar'}
    </div>,
    el,
  );
  
  console.log(1111)
  describe('Message Test', function () {
    console.log(2222)
    it('Message Test', function (done) {
      console.log(3333)
      setTimeout(() => {
        // let inst = document.querySelector('#div');
        // let childNodes = inst.childNodes;
        // let childDiv = childNodes[1];
        console.log(4444);
        
        ReactDOM.render(
          <div>
            {null}
            <div />
            {null}
          </div>,
          el,
        );
        console.log(11111, el.textContent)
        //childNodes = inst.childNodes;
        //expect(childNodes.length).toBe(1);
        // expect(childNodes[0]).toBe(childDiv);
  
        ReactDOM.render(
          <div>
            {'foo2'}
            <div />
            {'bar2'}
          </div>,
          el,
        );
        console.log(22222, el.textContent)
        // childNodes = inst.childNodes;
        // expect(childNodes.length).toBe(3);
        // expect(childNodes[0].data).toBe('foo');
        // expect(childNodes[1]).toBe(childDiv);
        // expect(childNodes[2].data).toBe('bar');
        done();
      }, 2000);
    });
  });
}

console.log('%c Test file end!', 'font-size: 20px; color: blue');
