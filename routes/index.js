import React, {Component, PropTypes} from 'react';
import {Route} from 'react-router';
import CloudNetContainer from '../containers/CloudNetContainer';

{/*<Route path="*" component={NoMatch}/>*/}

export default (
  <Route path='/' component={CloudNetContainer}>
  </Route>
);
