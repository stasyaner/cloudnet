import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {checkAuthentication} from '../actions';

class CloudNetContainer extends Component{
  constructor() {
    super(...arguments);
  }

  componentWillMount() {
    this.props.checkAuthentication(this.props.firebase);
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    firebase: state.firebase
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuthentication: (firebase) => dispatch(checkAuthentication(firebase))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)
  (CloudNetContainer);
