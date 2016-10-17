import React, { PropTypes } from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import routes from '../routes';

const Root = props => (
  <Provider store={props.store} dispatch={props.store.dispatch}>
    <Router history={props.history} routes={routes} />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Root;
