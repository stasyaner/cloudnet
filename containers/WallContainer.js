import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Friends from '../components/Wall/Friends';
import UserInfo from '../components/Wall/UserInfo';
import NewsFeed from '../components/Wall/NewsFeed';
import {fetchUserInfo, fetchUserNews, addNews, removeNews,
  like, fetchUserFriends, updateActivity, uploadAvatar} from '../actions';

class WallContainer extends Component{
  constructor() {
    super(...arguments);

    this.state = {
      showUploadAavatarModal: false,
      showPublishNewsFade: false
    }

    this.toggleUploadAvatarModal = this.toggleUploadAvatarModal.bind(this);
    this.togglePublishNewsFade = this.togglePublishNewsFade.bind(this);
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

  toggleUploadAvatarModal() {
    this.setState({
      showUploadAavatarModal: !this.state.showUploadAavatarModal
    });
  }

  togglePublishNewsFade() {
    this.setState({
      showPublishNewsFade: !this.state.showPublishNewsFade
    });
  }

  render() {
    return (
      <div id='the-wall'>
        <UserInfo
          showModal={this.state.showUploadAavatarModal}
          toggleModal={this.toggleUploadAvatarModal}
          user={this.props.user}
          userInfo={this.props.userInfo}
          uploadAvatar={this.props.uploadAvatar}/>

        <Friends
          userFriends={this.props.userInfo.friends}
          users={this.props.users}/>

        <NewsFeed
          fade={this.state.showPublishNewsFade}
          toggleFade={this.togglePublishNewsFade}
          user={this.props.user}
          users={this.props.users}
          news={this.props.news}
          userInfo={this.props.userInfo}
          addNews={this.props.addNews}
          removeNews={this.props.removeNews}
          like={this.props.like}/>
      </div>
    );
  }
}

WallContainer.propTypes = {
  userId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  users: PropTypes.objectOf(PropTypes.object).isRequired,
  userInfo: PropTypes.object.isRequired,
  news:  PropTypes.objectOf(PropTypes.object).isRequired
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
    addNews: news => dispatch(addNews(news)),
    removeNews: newsId => dispatch(removeNews(newsId)),
    like: newsId => dispatch(like(newsId)),
    fetchUserFriends: () => dispatch(fetchUserFriends(ownProps.params.userId)),
    updateActivity: userId => dispatch(updateActivity(userId)),
    uploadAvatar: (userId, avatar, avatarContext) =>
      dispatch(uploadAvatar(userId, avatar, avatarContext))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)
  (WallContainer);
