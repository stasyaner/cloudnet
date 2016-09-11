import React, {PropTypes} from 'react';
import {Navbar, Glyphicon, NavItem, Nav, Button, Form, FormGroup, FormControl,
  ProgressBar, InputGroup} from 'react-bootstrap';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap'

export default (props) => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to='/'>CloudNET</Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <Navbar.Form pullLeft>
            <FormGroup>
              <InputGroup>
                <FormControl type='text' placeholder='Поиск'/>
              </InputGroup>
            </FormGroup>
          </Navbar.Form>
          <NavItem id='top-menu-fast-backward'>
            <Glyphicon glyph='fast-backward'/>
          </NavItem>
          <NavItem id='top-menu-fast-play'>
            <Glyphicon glyph='play'/>
          </NavItem>
          <NavItem>
            <Glyphicon glyph='fast-forward'/>
          </NavItem>
          <NavItem id='top-menu-music'>
            <span id='top-menu-now-playing'>Балалайка - Дрынь</span>
            <span id='top-menu-music-progress'><ProgressBar now={60} /></span>
          </NavItem>
          <NavItem id='top-menu-account'>
            <span id='top-menu-name'>Станислав</span>
            <span id='top-menu-avatar'><img src='https://firebasestorage.googleapis.com/v0/b/cloudnet-7a95b.appspot.com/o/avatars%2Fthumbnails%2Fstasyaner_small.jpg?alt=media&token=8ef928c8-596d-4cb4-9dfd-9926070a34a3'/></span>
          </NavItem>
          <NavItem id='top-menu-logout' onClick={
            (event) => {
              event.preventDefault();
              props.logout();
            }
          }>
            <Glyphicon glyph='log-out'/> Выход
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
