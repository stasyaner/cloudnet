import React, {Component, PropTypes} from 'react';
import {Route} from 'react-router';

{/*<Route path="*" component={NoMatch}/>*/}

class Index extends Component{
  constructor() {
    super()
  }

  render() {
    return <h3>Hello</h3>
  }
}

export default (
  <Route path='/' component={Index}>
  </Route>
);
