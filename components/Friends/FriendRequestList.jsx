import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Panel, Badge, Glyphicon } from 'react-bootstrap';

const FriendRequestList = (props) => {
  const { currentUserUid, friendRequests, users } = props;
  const friendRequestsValuesArr = Object.values(friendRequests);
  const friendRequestsNum = friendRequestsValuesArr.length;

  const requestListPanelHeader = (
    <div>
      <div>Заявки в друзья</div>
      <Badge>{friendRequestsNum}</Badge>
    </div>
  );

  const friendRequestsJSXArr = [];
  for (let i = 0; i < friendRequestsNum; i += 1) {
    const toUserId = friendRequestsValuesArr[i].to;
    const fromUserId = friendRequestsValuesArr[i].from;
    let requestUserId = toUserId;
    let requestFlowArrowGlyph = <Glyphicon glyph="arrow-up" />;

    if (toUserId === currentUserUid) {
      requestFlowArrowGlyph = <Glyphicon glyph="arrow-down" />;
      requestUserId = fromUserId;
    }

    const userAvatarSmallURL = users[requestUserId] && users[requestUserId].avatar.small;
    const userFirstName = users[requestUserId] && users[requestUserId].displayName.substring(0, users[requestUserId].displayName.indexOf(' '));
    const userWallLink = `/theWall/${requestUserId}`;

    const friendRequestItemDivContent = (
      <Link to={userWallLink}>
        <div className="small-avatar">
          <img alt="avatar" src={userAvatarSmallURL} />
        </div>
        <div className="side-panel-friend-name">
          {userFirstName}
          {requestFlowArrowGlyph}
        </div>
      </Link>
    );

    friendRequestsJSXArr.push(
      <div className="friend-request-item" key={friendRequestsValuesArr[i].id}>
        {friendRequestItemDivContent}
      </div>,
    );
  }

  return (
    <div id="friend-request-list">
      <Panel header={requestListPanelHeader}>
        {friendRequestsJSXArr}
      </Panel>
    </div>
  );
};

FriendRequestList.propTypes = {
  users: PropTypes.objectOf(PropTypes.object).isRequired,
  friendRequests: PropTypes.objectOf(PropTypes.object),
  currentUserUid: PropTypes.string.isRequired,
};

export default FriendRequestList;
