import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import TheWall from '../components/TheWall';
import {checkAuthentication} from '../actions';

class CloudNetContainer extends Component{
  constructor() {
    super(...arguments);
  }

  // componentWillMount() {
  //   this.props.checkAuthentication(this.props.firebase);
  // }

  render() {
    return <TheWall />;
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
    //checkAuthentication: (firebase) => dispatch(checkAuthentication(firebase))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)
  (CloudNetContainer);
