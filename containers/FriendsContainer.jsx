import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FriendsList from '../components/Friends/FriendsList';
import FriendsSearchForm from '../components/Friends/FriendsSearchForm';
import { fetchUserFriends, searchUser } from '../actions';

class FriendsContainer extends Component {
  componentWillMount() {
    this.props.fetchUserFriends();
  }

  render() {
    return (
      <div id="friends-page">
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
};

const mapStateToProps = state => ({
  users: state.entities.users,
  userFriends: state.user.friends ? state.user.friends : {},// || {},
  userSearchResult: state.entities.userSearchResult,
});

const mapDispatchToProps = dispatch => ({
  fetchUserFriends: () => dispatch(fetchUserFriends('self')),
  searchUser: displayName => dispatch(searchUser(displayName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendsContainer);
