import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import TheWall from '../components/TheWall';
import {fetchUserInfo, fetchUserNews, addNews, removeNews,
  like} from '../actions';

class CloudNetContainer extends Component{
  constructor() {
    super(...arguments);
  }

  componentWillMount() {
    this.props.fetchUserInfo(this.props.userId);
    this.props.fetchUserNews(this.props.userId);
  }

  render() {
    return (
      <TheWall
        userInfo={this.props.userInfo}
        news={this.props.news}
        addNews={(news) => {this.props.addNews(this.props.userId, news)}}
        removeNews={(newsId) => {this.props.removeNews(this.props.userId, newsId)}}
        like={(newsId) => {this.props.like(this.props.userId, newsId)}}/>
    );
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
    fetchUserNews: id => dispatch(fetchUserNews(id)),
    addNews: (id, news) => dispatch(addNews(id, news)),
    removeNews: (userId, newsId) => dispatch(removeNews(userId, newsId)),
    like: (userId, newsId) => dispatch(like(userId, newsId))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)
  (CloudNetContainer);
