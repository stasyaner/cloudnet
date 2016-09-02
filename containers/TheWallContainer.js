import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import TheWall from '../components/TheWall';
import {fetchUserInfo, fetchUserNews} from '../actions';

class CloudNetContainer extends Component{
  constructor() {
    super(...arguments);
  }

  componentWillMount() {
    this.props.fetchUserInfo(this.props.userId);
    this.props.fetchUserNews(this.props.userId);
  }

  render() {
    return <TheWall userInfo={this.props.userInfo} news={this.props.news}/>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userId: ownProps.params.userId,
    userInfo: state.entities.users[ownProps.params.userId] || {},
    news: state.entities.news || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserInfo: id => dispatch(fetchUserInfo(id)),
    fetchUserNews: id => dispatch(fetchUserNews(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)
  (CloudNetContainer);
