import React, { PropTypes } from 'react';
import { Navbar, Glyphicon, NavItem, Nav, FormGroup, FormControl, ProgressBar, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router';

const TopMenu = (props) => {
  const avatar = props.currentUserAvatarSmall ? props.currentUserAvatarSmall : '';
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">CloudNET</Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <Navbar.Form pullLeft>
            <FormGroup>
              <InputGroup>
                <FormControl type="text" placeholder="Поиск" />
              </InputGroup>
            </FormGroup>
          </Navbar.Form>
          <NavItem id="top-menu-fast-backward">
            <Glyphicon glyph="fast-backward" />
          </NavItem>
          <NavItem id="top-menu-fast-play">
            <Glyphicon glyph="play" />
          </NavItem>
          <NavItem>
            <Glyphicon glyph="fast-forward" />
          </NavItem>
          <NavItem id="top-menu-music">
            <span id="top-menu-now-playing">Балалайка - Дрынь</span>
            <span id="top-menu-music-progress"><ProgressBar now={60} /></span>
          </NavItem>
          <NavItem id="top-menu-account">
            <span id="top-menu-name">Станислав</span>
            <span id="top-menu-avatar"><img alt="top-menu-avatar" src={avatar} /></span>
          </NavItem>
          <NavItem
            id="top-menu-logout"
            onClick={
              (event) => {
                event.preventDefault();
                props.logout();
              }
            }
          >
            <Glyphicon glyph="log-out" /> Выход
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

TopMenu.propTypes = {
  currentUserAvatarSmall: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};

export default TopMenu;
