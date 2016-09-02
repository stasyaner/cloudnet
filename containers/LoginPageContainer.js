import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import {connect} from 'react-redux';
import LoginPage from '../components/LoginPage';
import {login} from '../actions';

class CloudNetContainer extends Component{
  constructor() {
    super(...arguments);
  }

  componentWillMount() {
    if (this.props.user) {
      browserHistory.push('/newsFeed');
    };
  }

  render() {
    return <LoginPage
      login={this.props.login}
      authenticating={this.props.authenticating}/>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    authenticating: state.authenticating,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)
  (CloudNetContainer);
