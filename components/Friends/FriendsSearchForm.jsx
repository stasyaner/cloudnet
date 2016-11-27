import React, { PropTypes } from 'react';
import { Form, FormGroup } from 'react-bootstrap';

const FriendsSearchForm = props => (
  <Form id="friend-search">
    <FormGroup controlId="friend-search-text">
      <div
        id="friend-search-textarea"
        placeholder="Найти новых друзей"
        contentEditable="true"
        onInput={(event) => {
          const user = event.target.textContent;
          props.searchUser(user);
        }}
      />
    </FormGroup>
  </Form>
);

FriendsSearchForm.propTypes = {
  searchUser: PropTypes.func.isRequired,
};

export default FriendsSearchForm;
