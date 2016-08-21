import React, {Component, PropTypes} from 'react';
import {Route} from 'react-router';
import Index from '../containers/Index';

{/*<Route path="*" component={NoMatch}/>*/}

export default (
  <Route path='/' component={Index}>
  </Route>
);
