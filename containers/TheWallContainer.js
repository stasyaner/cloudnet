import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import TheWallFriends from '../components/TheWallFriends';
import TheWallUserInfo from '../components/TheWallUserInfo';
import TheWallNeewsFeed from '../components/TheWallNeewsFeed';
import {fetchUserInfo, fetchUserNews, addNews, removeNews,
  like, fetchUserFriends, updateActivity, toggleModalAction, uploadAvatar} from '../actions';

class TheWallContainer extends Component{
  constructor() {
    super(...arguments);
  }

  componentWillMount() {
    this.props.fetchUserInfo();
    this.props.fetchUserNews();
    this.props.fetchUserFriends();
    if (this.props.user.uid) {
      this.props.updateActivity(this.props.user.uid);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userId !== nextProps.userId) {
      nextProps.fetchUserInfo();
      nextProps.fetchUserNews();
      nextProps.fetchUserFriends();
      //here it's not principal which props instance to use
      this.props.updateActivity(this.props.user.uid);
    }
  }

  render() {
    return (
      <div id='the-wall'>
        <TheWallUserInfo
          showModal={this.props.showModal}
          toggleModal={this.props.toggleModal}
          user={this.props.user}
          userInfo={this.props.userInfo}
          uploadAvatar={this.props.uploadAvatar}/>

        <TheWallFriends
          userFriends={this.props.userInfo.friends}
          users={this.props.users}/>

        <TheWallNeewsFeed
          user={this.props.user}
          news={this.props.news}
          userInfo={this.props.userInfo}
          addNews={(news) => {this.props.addNews(this.props.user.uid, news)}}
          removeNews={(newsId) => {this.props.removeNews(this.props.user.uid, newsId)}}
          like={(newsId) => {this.props.like(this.props.user.uid, newsId)}}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    userId: ownProps.params.userId,
    users: state.entities.users,
    showModal: state.showModal,
    userInfo: state.entities.users[ownProps.params.userId] || {},
    news: state.entities.news
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleModal: () => dispatch(toggleModalAction()),
    fetchUserInfo: () => dispatch(fetchUserInfo(ownProps.params.userId)),
    fetchUserNews: () => dispatch(fetchUserNews(ownProps.params.userId)),
    addNews: (userId, news) => dispatch(addNews(userId, news)),
    removeNews: (userId, newsId) => dispatch(removeNews(userId, newsId)),
    like: (userId, newsId) => dispatch(like(userId, newsId)),
    fetchUserFriends: () => dispatch(fetchUserFriends(ownProps.params.userId)),
    updateActivity: userId => dispatch(updateActivity(userId)),
    uploadAvatar: (userId, avatar, avatarContext) =>
      dispatch(uploadAvatar(userId, avatar, avatarContext))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)
  (TheWallContainer);
