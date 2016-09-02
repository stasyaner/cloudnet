import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {checkAuthentication} from '../actions';

class CloudNetContainer extends Component{
  constructor() {
    super(...arguments);
  }

  componentWillMount() {
    this.props.checkAuthentication();
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuthentication: () => dispatch(checkAuthentication())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)
  (CloudNetContainer);
