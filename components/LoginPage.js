import React, {PropTypes} from 'react';
import {Form, FormGroup, FormControl,
  Checkbox, ControlLabel, Button, Col, Glyphicon} from 'react-bootstrap';

export default (props) => {
  return (
    <div className='container' id='login-page'>
      <Form horizontal name='user_login' onSubmit={(event) => {
        event.preventDefault();
        let form = document.forms['user_login'];
        props.login(form.elements['user_email'].value,
          form.elements['user_password'].value);
      }}>
        <FormGroup controlId='user_email'>
          <Col componentClass={ControlLabel} md={4}>
            Email
          </Col>
          <Col md={3}>
            <FormControl type='email' placeholder='Email' />
          </Col>
        </FormGroup>

        <FormGroup controlId='user_password'>
          <Col componentClass={ControlLabel} md={4}>
            Password
          </Col>
          <Col md={3}>
            <FormControl type='password' placeholder='Password' />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col mdOffset={4} md={5}>
            <Checkbox>Не запоминать</Checkbox>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col mdOffset={4} md={5}>
            <Button type='submit'>
              Sign in
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
}
