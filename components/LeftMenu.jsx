import React, { PropTypes } from 'react';
import { Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const LeftMenu = props => (
  <ListGroup id="left-menu">
    <LinkContainer to={`/theWall/${props.currentUserUid}`}>
      <ListGroupItem>Стена</ListGroupItem>
    </LinkContainer>
    <LinkContainer to="/newsFeed">
      <ListGroupItem>Новости</ListGroupItem>
    </LinkContainer>
    <ListGroupItem>Друзья</ListGroupItem>
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
