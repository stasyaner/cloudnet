import React, {PropTypes} from 'react';
import {Glyphicon, ListGroup, ListGroupItem} from 'react-bootstrap';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap'

export default (props) => {
  return (
    <ListGroup id='left-menu'>
      <LinkContainer to={'/theWall/' + props.user.id}>
        <ListGroupItem>Стена</ListGroupItem>
      </LinkContainer>
      <LinkContainer to='/newsFeed'>
        <ListGroupItem>Новости</ListGroupItem>
      </LinkContainer>
      <ListGroupItem>Друзья</ListGroupItem>
      <ListGroupItem>Фотографии</ListGroupItem>
      <ListGroupItem>Аудиозаписи</ListGroupItem>
      <ListGroupItem >Видеозаписи</ListGroupItem>
      <ListGroupItem>
        <Glyphicon glyph='cog'/> Настройки
      </ListGroupItem>
    </ListGroup>
  );
}
