/**
 * v0.0.1
 *
 * Copyright (c) 2017
 */

import React from 'react';
import ReactDOM from 'react-dom';

console.log('%c Test file: test$$should fail when passed two children %c start!', 'font-size: 20px; color: blue', 'color: green; font-size: 30px');

export default function main () {
  let WrapComponent;

  beforeEach(() => {
    WrapComponent = class extends React.Component {
      render () {
        return (
          <div>
            {React.Children.only(this.props.children, this.props.mapFn, this)}
          </div>
        );
      }
    };
  });

  it('should fail when passed two children', () => {
    expect(function () {
      const instance = (
        <WrapComponent>
          <div />
          <span />
        </WrapComponent>
      );

      React.Children.only(instance.props.children);
    }).toThrow();
  });
}

console.log('%c Test file: test$$should fail when passed two children %c end!', 'font-size: 20px; color: blue', 'color: green; font-size: 30px');
