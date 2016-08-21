import React, {PropTypes} from 'react';
import {Navbar, Glyphicon,
  NavItem, Nav, Button, Form, FormGroup, FormControl,
  ProgressBar} from 'react-bootstrap';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap'

export default (props) => {
  return (
    <Navbar fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to='/'>CloudNET</Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <Navbar.Form pullLeft>
            <Form>
              <FormGroup>
                <FormControl id='searchIssueInput' type='text' placeholder='Search'/>
              </FormGroup>
            </Form>
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
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
