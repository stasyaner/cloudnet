import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {logout} from '../actions';
import LeftMenu from '../components/LeftMenu';
import TopMenu from '../components/TopMenu';

class CloudNetContainer extends Component{
  constructor() {
    super(...arguments);
  }

  render() {
    return (
      <div>
        <TopMenu logout={() => {this.props.logout()}}/>
        <LeftMenu />
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)
  (CloudNetContainer);
