import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { checkAuthentication } from '../actions';

class CheckAuthenticationContainer extends Component {
  componentWillMount() {
    this.props.checkAuthentication();
  }

  render() {
    if (this.props.currentUserUid) {
      return this.props.children;
    }
    return <img alt="...loading" className="loadingImg" src="../loading.gif" />;
  }
}

CheckAuthenticationContainer.propTypes = {
  currentUserUid: PropTypes.string.isRequired,
  checkAuthentication: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = state => (
  {
    currentUserUid: state.user ? state.user.uid : '',
  }
);

const mapDispatchToProps = dispatch => (
  {
    checkAuthentication: () => dispatch(checkAuthentication()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(CheckAuthenticationContainer);
