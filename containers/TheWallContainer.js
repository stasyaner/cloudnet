import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import TheWall from '../components/TheWall';
import {fetchUserInfo} from '../actions';

class CloudNetContainer extends Component{
  constructor() {
    super(...arguments);
  }

  componentWillMount() {
    this.props.fetchUserInfo(this.props.userId);
  }

  render() {
    return <TheWall user={this.props.theWallOfUser}/>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userId: ownProps.params.userId,
    theWallOfUser: state.entities.users[ownProps.params.userId] || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserInfo: id => dispatch(fetchUserInfo(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)
  (CloudNetContainer);
