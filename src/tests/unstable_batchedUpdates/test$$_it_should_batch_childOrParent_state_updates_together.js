/**
 * v0.0.1
 *
 * Copyright (c) 2017
 */

import React from 'react';
import ReactDOM from 'react-dom';

export default function main () {
  var WrapComponent;

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
    expect(function() {
      var instance = (
        <WrapComponent>
          <div />
          <span />
        </WrapComponent>
      );
      debugger;
      React.Children.only(instance.props.children);
    }).toThrow();
  });
}
