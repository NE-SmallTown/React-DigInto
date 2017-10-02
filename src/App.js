/**
 * v0.0.1
 *
 * Copyright (c) 2017
 */

import React from 'react';
import PropTypes from 'prop-types';

import AppSideBar from './AppSideBar';

export default class App extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node
  }

  render () {
    const { children } = this.props;

    return (
      <div className="app-wrap">
        <div className="sidebar-wrap">
          <AppSideBar />
        </div>

        { children }
      </div>
    );
  }
};
