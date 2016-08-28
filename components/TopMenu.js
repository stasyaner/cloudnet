import React, {PropTypes} from 'react';
import {Navbar, Glyphicon, NavItem, Nav, Button, Form, FormGroup, FormControl,
  ProgressBar, InputGroup} from 'react-bootstrap';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap'

export default (props) => {
  return (
    <Navbar >
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
                <InputGroup.Addon><Glyphicon glyph='search'/></InputGroup.Addon>
                <FormControl type='text' placeholder='Поиск'/>
              </InputGroup>
            </FormGroup>
          </Navbar.Form>
          <LinkContainer to='/addIssue'>
            <NavItem>
              <Glyphicon glyph='fast-backward'/>
            </NavItem>
          </LinkContainer>
          <LinkContainer to='/pieChart'>
            <NavItem>
              <Glyphicon glyph='play'/>
            </NavItem>
          </LinkContainer>
          <NavItem>
            <Glyphicon glyph='fast-forward'/>
          </NavItem>
          <NavItem id='top-menu-music'>
            <span id='top-menu-now-playing'>Балалайка - Дрынь</span>
            <span id='top-menu-music-progress'><ProgressBar now={60} /></span>
          </NavItem>
          <NavItem id='top-menu-account'>
            <span id='top-menu-name'>Станислав</span>
            <span id='top-menu-avatar'><img src='../avatar_sample.jpg'/></span>
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
