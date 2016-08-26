import React, {PropTypes} from 'react';
import {Glyphicon, ListGroup, ListGroupItem} from 'react-bootstrap';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap'

export default (props) => {
  return (
    <ListGroup id='left-menu'>
      <ListGroupItem href='#'>Стена</ListGroupItem>
      <LinkContainer to='newsFeed'>
        <ListGroupItem href='#'>Новости</ListGroupItem>
      </LinkContainer>
      <ListGroupItem href='#'>Друзья</ListGroupItem>
      <ListGroupItem href='#'>Фотографии</ListGroupItem>
      <ListGroupItem href='#'>Аудиозаписи</ListGroupItem>
      <ListGroupItem href='#'>Видеозаписи</ListGroupItem>
      <ListGroupItem href='#'>
        <Glyphicon glyph='cog'/> Настройки
        </ListGroupItem>
    </ListGroup>
  );
}
