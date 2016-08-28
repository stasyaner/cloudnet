import React, {PropTypes} from 'react';
import {Glyphicon, ListGroup, ListGroupItem} from 'react-bootstrap';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap'

export default (props) => {
  let display;
  if(props.visible === false) display = "none";
  return (
    <ListGroup id='left-menu' style={{display: display}}>
      <ListGroupItem>Стена</ListGroupItem>
      <LinkContainer to='/'>
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
