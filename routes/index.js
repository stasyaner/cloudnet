import React, {Component, PropTypes} from 'react';
import {Route, IndexRoute} from 'react-router';
import CloudNetContainer from '../containers/CloudNetContainer';
import NewsFeedContainer from '../containers/NewsFeedContainer';
import LoginPageContainer from '../containers/LoginPageContainer';

{/*<Route path="*" component={NoMatch}/>*/}

export default (
  <Route path='/' component={CloudNetContainer}>
    <IndexRoute component={NewsFeedContainer}/>
    <Route path='login' component={LoginPageContainer}/>
  </Route>
);
