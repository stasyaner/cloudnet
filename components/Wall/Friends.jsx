import React, { PropTypes } from 'react';
import { Panel, Glyphicon, Badge } from 'react-bootstrap';
import { Link } from 'react-router';

const Friends = (props) => {
  const userFriends = [];
  const friendsNumber = Object.keys(props.userFriends).length;

  if (friendsNumber) {
    Object.keys(props.users).forEach((userKey) => {
      Object.keys(props.userFriends).forEach((friendKey) => {
        if (props.userFriends[friendKey] === userKey) {
          userFriends.push(
            <Link to={`/theWall/${userKey}`} key={userKey}>
              <div className="the-wall-friend">
                <div className="the-wall-friend-avatar">
                  <img alt="avatar" src={props.users[userKey].avatar.small} />
                </div>
                <div className="the-wall-friend-name">
                  {props.users[userKey].displayName}
                </div>
              </div>
            </Link>
          );
        }
      });
    });
  } else {
    userFriends[0] = (
      <Link to="addFriend" key="addFriendLink">
        <div className="the-wall-friend">
          <div className="the-wall-friend-name">
            <Glyphicon glyph="plus" /> Добавить друга
          </div>
        </div>
      </Link>
    );
  }

  const friendsPanelHeader = (
    <div>
      <div>Друзья</div>
      <Badge>{friendsNumber}</Badge>
    </div>
  );

  return (
    <div id="the-wall-friends">
      <Panel header={friendsPanelHeader}>
        {userFriends}
      </Panel>
    </div>
  );
};

Friends.propTypes = {
  userFriends: PropTypes.objectOf(PropTypes.string).isRequired,
  users: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Friends;
