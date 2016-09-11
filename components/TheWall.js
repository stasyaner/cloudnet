import React, {PropTypes} from 'react';
import TheWallFriends from './TheWallFriends';
import TheWallUserInfo from './TheWallUserInfo';
import TheWallNeewsFeed from './TheWallNeewsFeed';

export default (props) => {
  return (
    <div id='the-wall'>
      <TheWallUserInfo userInfo={props.userInfo} />
      <TheWallFriends userFriends={props.userInfo.friends} users={props.users}/>
      <TheWallNeewsFeed
        user={props.user}
        news={props.news}
        userInfo={props.userInfo}
        addNews={props.addNews}
        removeNews={props.removeNews}
        like={props.like}/>
    </div>
  );
}
