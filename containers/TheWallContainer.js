import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import TheWall from '../components/TheWall';
import {fetchUserInfo, fetchUserNews, addNews, removeNews,
  like, fetchUserFriends} from '../actions';

class CloudNetContainer extends Component{
  constructor() {
    super(...arguments);
  }

  componentWillMount() {
    this.props.fetchUserInfo();
    this.props.fetchUserNews();
    this.props.fetchUserFriends();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userId !== nextProps.userId) {
      nextProps.fetchUserInfo();
      nextProps.fetchUserNews();
      nextProps.fetchUserFriends();
    }
  }

  render() {
    return (
      <TheWall
        user={this.props.user}
        userInfo={this.props.userInfo}
        users={this.props.users}
        news={this.props.news}
        addNews={(news) => {this.props.addNews(this.props.user.id, news)}}
        removeNews={(newsId) => {this.props.removeNews(this.props.user.id, newsId)}}
        like={(newsId) => {this.props.like(this.props.user.id, newsId)}}/>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    userId: ownProps.params.userId,
    users: state.entities.users,
    userInfo: state.entities.users[ownProps.params.userId] || {},
    news: state.entities.news
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUserInfo: () => dispatch(fetchUserInfo(ownProps.params.userId)),
    fetchUserNews: () => dispatch(fetchUserNews(ownProps.params.userId)),
    addNews: (userId, news) => dispatch(addNews(userId, news)),
    removeNews: (userId, newsId) => dispatch(removeNews(userId, newsId)),
    like: (userId, newsId) => dispatch(like(userId, newsId)),
    fetchUserFriends: () => dispatch(fetchUserFriends(ownProps.params.userId))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)
  (CloudNetContainer);
