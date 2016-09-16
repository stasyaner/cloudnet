import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {checkAuthentication} from '../actions';

class CheckAuthenticationContainer extends Component{
  constructor() {
    super(...arguments);
  }

  componentWillMount() {
    this.props.checkAuthentication();
  }

  render() {
    if (this.props.user) {
      return this.props.children;
    }
    return <img className='loadingImg' src='../loading.gif' />;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuthentication: () => dispatch(checkAuthentication())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)
  (CheckAuthenticationContainer);
