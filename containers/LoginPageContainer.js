import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import {connect} from 'react-redux';
import LoginPage from '../components/LoginPage';
import {checkAuthentication, login} from '../actions';

class CloudNetContainer extends Component{
  constructor() {
    super(...arguments);
  }

  componentWillMount() {
    this.props.checkAuthentication();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      browserHistory.push('/newsFeed');
    };
  }

  render() {
    if (this.props.checkingAuthentication) {
      return <img className='loadingImg' src='../loading.gif' />;
    }
    return <LoginPage
      login={this.props.login}
      authenticating={this.props.authenticating}/>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    checkingAuthentication: state.checkingAuthentication,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password)),
    checkAuthentication: () => dispatch(checkAuthentication())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)
  (CloudNetContainer);
