import React, { PropTypes } from 'react';
import { Panel, Glyphicon, Badge } from 'react-bootstrap';
import { Link } from 'react-router';

const Friends = (props) => {
  const userFriendsJSX = [];
  const { users, userFriends } = props;
  const userFriendIdList = Object.keys(userFriends);
  const friendsNumber = userFriendIdList.length;

  if (friendsNumber > 0) {
    for (let i = 0; i < friendsNumber; i += 1) {
      if (users[userFriendIdList[i]]) {
        userFriendsJSX.push(
          <Link to={`/theWall/${userFriendIdList[i]}`} key={userFriendIdList[i]}>
            <div className="side-panel right-panel">
              <div className="small-avatar">
                <img alt="avatar" src={users[userFriendIdList[i]].avatar.small} />
              </div>
              <div className="side-panel-friend-name">
                {users[userFriendIdList[i]].displayName}
              </div>
            </div>
          </Link>,
        );
      }
    }
  } else if (props.currentUserUid === props.userInfoId) {
    userFriendsJSX[0] = (
      <Link to="/friends" key="addFriendLink">
        <div className="the-wall-friend">
          <div className="the-wall-friend-name">
            <Glyphicon glyph="plus" /> Добавить друга
          </div>
        </div>
      </Link>
    );
  } else {
    userFriendsJSX[0] = (
      <div className="the-wall-friend" key={'no-friends'}>
        <div className="the-wall-friend-name">
          Пользователь пока никого не добавил
        </div>
      </div>
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
        {userFriendsJSX}
      </Panel>
    </div>
  );
};

Friends.propTypes = {
  users: PropTypes.objectOf(PropTypes.object).isRequired,
  userFriends: PropTypes.objectOf(PropTypes.string),
  currentUserUid: PropTypes.string.isRequired,
  userInfoId: PropTypes.string.isRequired,
};

export default Friends;
