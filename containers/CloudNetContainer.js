import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {checkAuthentication, logout} from '../actions';
import LeftMenu from '../components/LeftMenu';
import TopMenu from '../components/TopMenu';

class CloudNetContainer extends Component{
  constructor() {
    super(...arguments);
  }

  componentWillMount() {
    this.props.checkAuthentication(this.props.firebase);
  }

  render() {
    return (
      <div>
        <TopMenu logout={() => {this.props.logout(this.props.firebase);}}/>
        <LeftMenu visible={this.props.user ? true : false}/>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    firebase: state.firebase,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuthentication: firebase => dispatch(checkAuthentication(firebase)),
    logout: firebase => dispatch(logout(firebase))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)
  (CloudNetContainer);
