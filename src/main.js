import React from 'react';
import ReactDOM from 'react-dom';

const MOUNT_NODE = document.getElementById('root');

// config our app
let render = () => {
  const AppContainer = require('./AppContainer').default;
  const routes = require('./routes/index').default;

  //debugger;
  ReactDOM.render(
    <AppContainer routes={routes} />,
    MOUNT_NODE
  );
};

if (__DEV__) {
  if (module.hot) {
    const renderApp = render;

    render = () => {
      try {
        renderApp();
      } catch (e) {
        console.error(e);
      }
    };

    // Setup hot module replacement
    module.hot.accept(
      [
        './AppContainer',
        './routes/index'
      ],
      () => setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
      })
    );
  }
}

render();
