import React, { PropTypes } from 'react';
import { Glyphicon, ListGroup, ListGroupItem, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const LeftMenu = props => (
  <ListGroup id="left-menu">
    <LinkContainer to={`/theWall/${props.currentUserUid}`}>
      <ListGroupItem>Стена</ListGroupItem>
    </LinkContainer>
    <LinkContainer to="/newsFeed">
      <ListGroupItem>Новости</ListGroupItem>
    </LinkContainer>
    <LinkContainer to="/notifications">
      <ListGroupItem>Уведомления <Badge>3</Badge></ListGroupItem>
    </LinkContainer>
    <LinkContainer to="/friends">
      <ListGroupItem>Друзья</ListGroupItem>
    </LinkContainer>
    <ListGroupItem>Фотографии</ListGroupItem>
    <ListGroupItem>Аудиозаписи</ListGroupItem>
    <ListGroupItem >Видеозаписи</ListGroupItem>
    <ListGroupItem>
      <Glyphicon glyph="cog" /> Настройки
    </ListGroupItem>
  </ListGroup>
);

LeftMenu.propTypes = {
  currentUserUid: PropTypes.string.isRequired,
};

export default LeftMenu;
