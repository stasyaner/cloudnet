import React, {Component, PropTypes} from 'react';
import {Route, IndexRoute} from 'react-router';
import CloudNetContainer from '../containers/CloudNetContainer';
import NewsFeedContainer from '../containers/NewsFeedContainer';
import LoginPageContainer from '../containers/LoginPageContainer';
import TheWallContainer from '../containers/TheWallContainer';
import CheckAuthenticationContainer from '../containers/CheckAuthenticationContainer';

{/*<Route path="*" component={NoMatch}/>*/}

export default (
  <Route>
    <Route path='login' component={LoginPageContainer}/>
    <Route component={CheckAuthenticationContainer}>
      <Route path='/' component={CloudNetContainer}>
        <IndexRoute component={NewsFeedContainer}/>
        <Route path='newsFeed' component={NewsFeedContainer}/>
        <Route path='theWall/:userId' component={TheWallContainer}/>
      </Route>
    </Route>
  </Route>
);
