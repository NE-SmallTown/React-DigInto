/**
 * v0.0.1
 *
 * Copyright (c) 2017
 */
import React from 'react';
import ReactNoop from 'react-noop-renderer';

console.log('%c Test file start!', 'font-size: 20px; color: blue');

export default function main () {
  function span (prop) {
    return { type: 'span', children: [], prop };
  }
  
  class Foo extends React.Component {
    render () {
      console.log(111, this.props.prop);
      return (
        <span>{this.props.prop}</span>
      );
    }
  }

  // Initial render.
  console.log(11);
  ReactNoop.render(<Foo prop={1} />);
  ReactNoop.flush();
  console.log(ReactNoop.getChildren(), [span(1)]);
  console.log(22);

  ReactNoop.batchedUpdates(() => {
    console.log(33);

    ReactNoop.render(<Foo prop={5} />);
    console.log(44);

    ReactNoop.flushSync(() => {
      console.log(55);

      ReactNoop.render(<Foo prop={2} />);
      ReactNoop.render(<Foo prop={3} />);
      ReactNoop.render(<Foo prop={4} />);
      console.log(66);
    });
  });
  // The sync updates flush first.
  console.log(77);

  console.log(ReactNoop.getChildren(), [span(4)]);

  // The terminal value should be the last update that was scheduled,
  // regardless of priority. In this case, that's the last sync update.
  console.log(88);

  ReactNoop.flush();
  console.log(ReactNoop.getChildren(), [span(4)]);
}

console.log('%c Test file end!', 'font-size: 20px; color: blue');
