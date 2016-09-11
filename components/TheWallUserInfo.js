import React, {PropTypes} from 'react';
import {Form, FormGroup, FormControl, Button, Panel, Col,
  Glyphicon, Collapse, Badge} from 'react-bootstrap';
import {Link} from 'react-router';
import TheWallFriends from './TheWallFriends';

export default (props) => {

  let {birthday, city, displayName, university, signature,
    status, avatar} = props.userInfo;
  let age;

  let avatarLink='';
  if (avatar) {
    avatarLink=avatar.thumbnails.theWall;
  }

  if(birthday) {
    age = new Date().getFullYear() - new Date(birthday).getFullYear();
    birthday = new Date(birthday).toLocaleString('ru', {
      year: 'numeric',
      day: 'numeric',
      month: 'long'});
  }

  return (
    <div id='the-wall-head'>
      <div id='the-wall-avatar'>
        <img src={avatarLink} />
      </div>

      <div id='the-wall-profile-info'>
        <div id='the-wall-profile-info-name'>{displayName}</div>
        <div id='the-wall-profile-info-status'>{status}</div>
        <div id='the-wall-profile-info-signature'>{signature}</div>
        <div id='the-wall-profile-info-delimiter'><hr /></div>


        <Col md={3}>Родился:</Col>
        <Col md={9}>
          <div id='the-wall-profile-info-birthday'>
            {birthday}, {age} год(-а)</div>
        </Col>

        <Col md={3}>Город:</Col>
        <Col md={9}>
          <div id='the-wall-profile-info-city'>{city}</div>
        </Col>

        <Col md={3}>Место учебы:</Col>
        <Col md={9}>
          <div id='the-wall-profile-info-univercity'>{university}</div>
        </Col>
      </div>
    </div>
  );
}
