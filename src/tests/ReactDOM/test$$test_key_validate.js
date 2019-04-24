/**
 * v0.0.1
 *
 * Copyright (c) 2017
 */
import React from 'react';
import ReactDOM from 'react-dom';

console.log('%c Test file start!', 'font-size: 20px; color: blue');

export default function main () {
  class Bar extends React.Component {
    render () {
      return (
        <div>
          <span>1111</span>
            {[2, 3].map((v) => <div>{v}</div>)}
          <div>33333</div>
        </div>
      );
    }
  }
  
  ReactDOM.render(<Bar />, document.getElementById('root-tests'));
}

console.log('%c Test file end!', 'font-size: 20px; color: blue');
