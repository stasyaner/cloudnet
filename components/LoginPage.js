import React, {PropTypes} from 'react';
import {Form, FormGroup, FormControl, Checkbox, ControlLabel, Button, Col, Glyphicon} from 'react-bootstrap';

export default (props) => {
  return (
    <div style={{ float: 'left', width : 955}}>
      <Form horizontal name='user_login' onSubmit={(event) => {
        event.preventDefault();
        let form = document.forms['user_login'];
        props.login(props.firebase,
          form.elements['user_email'].value, form.elements['user_password'].value);
      }}>
        <FormGroup controlId='user_email'>
          <Col componentClass={ControlLabel} md={2}>
            Email
          </Col>
          <Col md={5}>
            <FormControl type='email' placeholder='Email' />
          </Col>
        </FormGroup>

        <FormGroup controlId='user_password'>
          <Col componentClass={ControlLabel} md={2}>
            Password
          </Col>
          <Col md={5}>
            <FormControl type='password' placeholder='Password' />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col mdOffset={2} md={5}>
            <Checkbox>Remember me</Checkbox>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col mdOffset={2} md={5}>
            <Button type='submit'>
              Sign in
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
}
