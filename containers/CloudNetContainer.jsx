import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions';
import LeftMenu from '../components/LeftMenu';
import TopMenu from '../components/TopMenu';

// It should be class for now. Later it will be enhaced
class CloudNetContainer extends Component {
  constructor(...restParams) {
    super(...restParams);
  }

  render() {
    return (
      <div>
        <TopMenu
          logout={this.props.logout}
          currentUserAvatarSmall={this.props.currentUserAvatarSmall}
        />
        <LeftMenu currentUserUid={this.props.currentUserUid} />
        {this.props.children}
      </div>
    );
  }
}

CloudNetContainer.propTypes = {
  currentUserUid: PropTypes.string.isRequired,
  currentUserAvatarSmall: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = state => (
  {
    currentUserUid: state.user.uid,
    currentUserAvatarSmall: state.user.avatar.small,
  }
);

const mapDispatchToProps = dispatch => (
  {
    logout: () => dispatch(logout()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(CloudNetContainer);
