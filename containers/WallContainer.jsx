import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Friends from '../components/Wall/Friends';
import UserInfo from '../components/Wall/UserInfo';
import NewsFeed from '../components/Wall/NewsFeed';
import { fetchUserWall, addNews, removeNews, like, updateActivity, uploadAvatar,
  toggleFriend } from '../actions';

class WallContainer extends Component {
  constructor(...restParams) {
    super(...restParams);

    this.state = {
      showUploadAavatarModal: false,
      showPublishNewsFade: false,
    };

    this.toggleUploadAvatarModal = this.toggleUploadAvatarModal.bind(this);
    this.togglePublishNewsFade = this.togglePublishNewsFade.bind(this);
  }

  componentWillMount() {
    this.props.fetchUserWall();
    if (this.props.currentUserUid) {
      this.props.updateActivity(this.props.currentUserUid);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userId !== nextProps.userId) {
      nextProps.fetchUserWall();

      // here it's not principal which props instance to use
      this.props.updateActivity(this.props.currentUserUid);
    }
  }

  toggleUploadAvatarModal() {
    this.setState({
      showUploadAavatarModal: !this.state.showUploadAavatarModal,
    });
  }

  togglePublishNewsFade() {
    this.setState({
      showPublishNewsFade: !this.state.showPublishNewsFade,
    });
  }

  render() {
    const { friends = {} } = this.props.userInfo;
    const { id = '' } = this.props.userInfo;

    return (
      <div id="the-wall">
        <UserInfo
          showModal={this.state.showUploadAavatarModal}
          toggleModal={this.toggleUploadAvatarModal}
          currentUserUid={this.props.currentUserUid}
          isFriend={this.props.isFriend}
          userInfo={this.props.userInfo}
          uploadAvatar={this.props.uploadAvatar}
          toggleFriend={this.props.toggleFriend}
        />

        <Friends
          currentUserUid={this.props.currentUserUid}
          userInfoId={id}
          userFriends={friends}
          users={this.props.users}
        />

        <NewsFeed
          fade={this.state.showPublishNewsFade}
          toggleFade={this.togglePublishNewsFade}
          currentUserUid={this.props.currentUserUid}
          users={this.props.users}
          news={this.props.news}
          userInfoId={id}
          addNews={this.props.addNews}
          removeNews={this.props.removeNews}
          like={this.props.like}
        />
      </div>
    );
  }
}

WallContainer.propTypes = {
  userId: PropTypes.string.isRequired,
  currentUserUid: PropTypes.string.isRequired,
  users: PropTypes.objectOf(PropTypes.object).isRequired,
  userInfo: PropTypes.objectOf(
    PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.object,
    ])
  ).isRequired,
  news: PropTypes.objectOf(PropTypes.object).isRequired,
  fetchUserWall: PropTypes.func.isRequired,
  addNews: PropTypes.func.isRequired,
  removeNews: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired,
  updateActivity: PropTypes.func.isRequired,
  uploadAvatar: PropTypes.func.isRequired,
  toggleFriend: PropTypes.func.isRequired,
  isFriend: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => (
  {
    currentUserUid: state.user.uid,
    userId: ownProps.params.userId,
    isFriend: {}.hasOwnProperty.call(state.user.friends, ownProps.params.userId),
    users: state.entities.users,
    userInfo: state.entities.users[ownProps.params.userId] || {},
    news: state.entities.news,
  }
);

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    fetchUserWall: () => dispatch(fetchUserWall(ownProps.params.userId)),
    addNews: news => dispatch(addNews(news)),
    removeNews: newsId => dispatch(removeNews(newsId)),
    like: newsId => dispatch(like(newsId)),
    updateActivity: userId => dispatch(updateActivity(userId)),
    uploadAvatar: (avatar, avatarContext) => dispatch(uploadAvatar(avatar, avatarContext)),
    toggleFriend: () => dispatch(toggleFriend(ownProps.params.userId)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(WallContainer);
