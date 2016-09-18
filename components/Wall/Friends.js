import React, {PropTypes} from 'react';
import {Form, FormGroup, FormControl, Button, Panel, Col,
  Glyphicon, Collapse, Badge} from 'react-bootstrap';
import {Link} from 'react-router';

export default (props) => {

  let userFriends = [];
  let friendsNumber = 0;

  if (props.userFriends) {

    friendsNumber = Object.keys(props.userFriends).length;

    for(let userKey in props.users) {
      for(let friendKey in props.userFriends) {
        if(props.userFriends[friendKey] === userKey) {
          userFriends.push(
            <Link to={'/theWall/' + userKey} key={userKey}>
              <div className='the-wall-friend'>
                <div className='the-wall-friend-avatar'>
                  <img src={props.users[userKey].avatar.thumbnails.small}/>
                </div>
                <div className='the-wall-friend-name'>
                  {props.users[userKey].displayName}
                </div>
              </div>
            </Link>
          );
        }
      }
    }
  }
  else {
    userFriends[0] = (
      <Link to='addFriend' key='addFriendLink'>
        <div className='the-wall-friend'>
          <div className='the-wall-friend-name'>
            <Glyphicon glyph='plus'/> Добавить друга
          </div>
        </div>
      </Link>
    );
  }

  let friendsPanelHeader = (
    <div>
      <div>Друзья</div>
      <Badge>{friendsNumber}</Badge>
    </div>
  );

  return (
    <div id='the-wall-friends'>
      <Panel header={friendsPanelHeader}>
        {userFriends}
      </Panel>
    </div>
  )
}
