/**
 * v0.0.1
 *
 * Copyright (c) 2017
 */

import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory, Router } from 'react-router';

import './globalStyles/global.scss';

export default class AppContainer extends React.PureComponent {
  static propTypes = {
    routes : PropTypes.object.isRequired
  }

  render () {
    const { routes } = this.props;

    // because we are testing,so there is no neccerary to use <Provider> of react-redux
    return (
      <Router history={browserHistory} children={routes} />
    );
  }
};
