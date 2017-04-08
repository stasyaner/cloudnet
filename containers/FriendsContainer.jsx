import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FriendsList from '../components/Friends/FriendsList';
import FriendsSearchForm from '../components/Friends/FriendsSearchForm';
import FriendRequestList from '../components/Friends/FriendRequestList';
import { fetchUserFriends, searchUser, fetchCurrentUserFriendRequests } from '../actions';

class FriendsContainer extends Component {
  componentWillMount() {
    this.props.fetchUserFriends();
    this.props.fetchCurrentUserFriendRequests();
  }

  render() {
    return (
      <div id="friends-page">
        <FriendRequestList
          currentUserUid={this.props.currentUserUid}
          friendRequests={this.props.currentUserFriendRequests}
          users={this.props.users}
        />
        <FriendsSearchForm searchUser={this.props.searchUser} />
        <FriendsList
          userFriends={this.props.userFriends}
          users={this.props.users}
          userSearchResult={this.props.userSearchResult}
        />
      </div>
    );
  }
}

FriendsContainer.propTypes = {
  fetchUserFriends: PropTypes.func.isRequired,
  userFriends: PropTypes.objectOf(PropTypes.string),
  users: PropTypes.objectOf(PropTypes.object).isRequired,
  searchUser: PropTypes.func.isRequired,
  userSearchResult: PropTypes.objectOf(PropTypes.object),
  fetchCurrentUserFriendRequests: PropTypes.func.isRequired,
  currentUserFriendRequests: PropTypes.objectOf(PropTypes.object),
  currentUserUid: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  users: state.entities.users,
  userFriends: state.user.friends || {},
  userSearchResult: state.entities.userSearchResult,
  currentUserFriendRequests: state.entities.currentUserFriendRequests,
  currentUserUid: state.user.uid,
});

const mapDispatchToProps = dispatch => ({
  fetchUserFriends: () => dispatch(fetchUserFriends('self')),
  searchUser: displayName => dispatch(searchUser(displayName)),
  fetchCurrentUserFriendRequests: () => dispatch(fetchCurrentUserFriendRequests()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendsContainer);
