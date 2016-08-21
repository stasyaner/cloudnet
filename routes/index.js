import React, {Component, PropTypes} from 'react';
import {Route} from 'react-router';
import TopMenuContainer from '../containers/TopMenuContainer';

{/*<Route path="*" component={NoMatch}/>*/}

export default (
  <Route path='/' component={TopMenuContainer}>
  </Route>
);
