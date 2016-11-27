import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const FriendsList = (props) => {
  const friendsJSX = [];
  const { users } = props;
  let userList = props.userFriends;

  if (props.userSearchResult && (Object.keys(props.userSearchResult).length > 0)) {
    userList = props.userSearchResult;
  }

  const userFriendsIdList = Object.keys(userList);
  const friendsNumber = userFriendsIdList.length;

  if (friendsNumber > 0) {
    for (let i = 0; i < friendsNumber; i += 1) {
      if (users[userFriendsIdList[i]]) {
        friendsJSX.push(
          <div className="friend-item" key={userFriendsIdList[i]}>
            <div className="friend-avatar">
              <Link to={`/theWall/${userFriendsIdList[i]}`}>
                <img alt="avatar" src={users[userFriendsIdList[i]].avatar.middle} />
              </Link>
            </div>
            <div className="friend-right-pane">
              <Link to={`/theWall/${userFriendsIdList[i]}`}>
                <div className="friend-name">
                  {users[userFriendsIdList[i]].displayName}
                </div>
              </Link>
              <div className="friend-dialog">
                <Link to="/dialog/123">
                  Перейти к диалогу
                </Link>
              </div>
              <div className="friend-remove">
                <a
                  onClick={
                    (event) => {
                      event.preventDefault();
                      if (confirm('Вы действительно хотите удалить этого друга?')) {
                        // do smth
                      }
                    }
                  }
                >
                  Удалить из друзей
                </a>
              </div>
            </div>
          </div>
        );
      }
    }
    // userFriendsIdList.forEach((friendId) => {
    //   friendsJSX.push(
    //     <div className="friend-item" key={friendId}>
    //       <div className="friend-avatar">
    //         <Link to={`/theWall/${friendId}`}>
    //           <img alt="avatar" src={userList[friendId].avatar.middle} />
    //         </Link>
    //       </div>
    //       <div className="friend-right-pane">
    //         <Link to={`/theWall/${friendId}`}>
    //           <div className="friend-name">
    //             {userList[friendId].displayName}
    //           </div>
    //         </Link>
    //         <div className="friend-dialog">
    //           <Link to="/dialog/123">
    //             Перейти к диалогу
    //           </Link>
    //         </div>
    //         <div className="friend-remove">
    //           <a
    //             onClick={
    //               (event) => {
    //                 event.preventDefault();
    //                 if (confirm('Вы действительно хотите удалить этого друга?')) {
    //                   // do smth
    //                 }
    //               }
    //             }
    //           >
    //             Удалить из друзей
    //           </a>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // });
  } else {
    friendsJSX.push(<div key="no-userList-message">Начните вводить имя, чтобы найти друзей</div>);
  }

  return <div id="userList-list">{friendsJSX}</div>;
};

FriendsList.propTypes = {
  userSearchResult: PropTypes.objectOf(PropTypes.object),
  friends: PropTypes.objectOf(PropTypes.object),
};

export default FriendsList;
