import React, {PropTypes} from 'react';
import {Panel, Col, Glyphicon} from 'react-bootstrap';

export default (props) => {

  let {birthday, city, displayName, university, signature,
    status} = props.userInfo;
  let age;

  if(birthday) {
    age = new Date().getFullYear() - new Date(birthday).getFullYear();
    birthday = new Date(birthday).toLocaleString('ru', {
      year: 'numeric',
      day: 'numeric',
      month: 'long'});
  }

  let newsFeedContent = [];
  if (props.news) {
    for(let key in props.news) {
      let footerContent= (
        <div className='likes'>
          <a href='#'>
            {props.news[key].likes.length} <Glyphicon glyph='heart'/> Лайков
          </a>
        </div>
      );

      newsFeedContent.push(
        <Panel footer={footerContent} key={props.news[key].id}>
          {props.news[key].content}
        </Panel>
      );
    }
  }

  return (
    <div id='the-wall'>
      <div id='the-wall-avatar'>
        <img src='../avatar_sample_wall.jpg' />
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

      <div id='the-wall-friends'>
        sfdsfdsf
      </div>

      <div id='the-wall-news-feed'>{newsFeedContent}</div>
    </div>
  );
}
