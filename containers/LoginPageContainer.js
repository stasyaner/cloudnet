import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import LoginPage from '../components/LoginPage';
import {login, checkAuthentication} from '../actions';

class CloudNetContainer extends Component{
  constructor() {
    super(...arguments);
  }

  componentWillMount() {
    this.props.checkAuthentication(this.props.firebase);
  }

  render() {
    return <LoginPage
      firebase={this.props.firebase}
      login={this.props.login}
      user={this.props.user}
      authenticating={this.props.authenticating}/>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    firebase: state.firebase,
    authenticating: state.authenticating,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuthentication: (firebase) => dispatch(checkAuthentication(firebase)),
    login: (firebase, email, password) => dispatch(login(firebase, email, password))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)
  (CloudNetContainer);
