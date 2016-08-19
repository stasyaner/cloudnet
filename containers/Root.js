import React, {Component, PropTypes}  from 'react';
import {Router} from 'react-router';
import {Provider} from 'react-redux';
import routes from '../routes';

export default class Root extends Component {
  render() {
    return(
      <Provider store={this.props.store} dispatch={this.props.store.dispatch}>
        <Router history={this.props.history} routes={routes} />
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}
