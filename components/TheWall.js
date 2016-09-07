import React, {PropTypes} from 'react';
import {Form, FormGroup, FormControl, Button, Panel, Col,
  Glyphicon, Collapse} from 'react-bootstrap';

export default (props) => {

  let {birthday, city, displayName, university, signature,
    status} = props.userInfo;
  let age;

  if(birthday) {
    age = new Date().getFullYear() - new Date(birthday).getFullYear();
    birthday = new Date(birthday).toLocaleString('ru', {
      year: 'numeric',
      day: 'numeric',
      month: 'long'});
  }

  let newsFeedContent = [];
  if (props.news) {
    for(let key in props.news) {
      let footerContent= (
        <div className='likes'>
          <a href='#'>
            {props.news[key].likes ? props.news[key].likes.length : 0}
            {' '}
            <Glyphicon glyph='heart'/> Лайков
          </a>
        </div>
      );

      newsFeedContent.push(
        <Panel footer={footerContent} key={props.news[key].id}>
          <div className='the-wall-remove-news'><a
            onClick={
              (event) => {
                event.preventDefault();
                if (confirm('Вы действительно хотите удалить новость?')) {
                  props.removeNews(props.news[key].id);
                }
              }
            }>
            <Glyphicon glyph='remove'/>
          </a></div>
          {props.news[key].content}
        </Panel>
      );
    }
  }

  function onSubmit(event) {
    event.preventDefault();
    let textArea = document.getElementById('the-wall-publish-news-textarea');
    let content = textArea.textContent;
    if (content) {
      props.addNews({
        content,
        timestamp: new Date().getTime()
      });
      textArea.innerText = '';
    }
  }

  return (
    <div id='the-wall'>
      <div id='the-wall-avatar'>
        <img src='../avatar_sample_wall.jpg' />
      </div>

      <div id='the-wall-profile-info'>
        <div id='the-wall-profile-info-name'>{displayName}</div>
        <div id='the-wall-profile-info-status'>{status}</div>
        <div id='the-wall-profile-info-signature'>{signature}</div>
        <div id='the-wall-profile-info-delimiter'><hr /></div>

        <Col md={3}>Родился:</Col>
        <Col md={9}>
          <div id='the-wall-profile-info-birthday'>
            {birthday}, {age} год(-а)</div>
        </Col>

        <Col md={3}>Город:</Col>
        <Col md={9}>
          <div id='the-wall-profile-info-city'>{city}</div>
        </Col>

        <Col md={3}>Место учебы:</Col>
        <Col md={9}>
          <div id='the-wall-profile-info-univercity'>{university}</div>
        </Col>
      </div>

      <div id='the-wall-friends'>
        sfdsfdsf
      </div>

      <div id='the-wall-news-feed'>

        <Form id='the-wall-publish-news-form' onSubmit={onSubmit}>
          <FormGroup controlId='the-wall-publish-news-form-text'>
            <div id='the-wall-publish-news-textarea'
              placeholder='Поделиться новостью'
              contentEditable='true'>
            </div>
          </FormGroup>

          <FormGroup>
            <Button type='submit'>Поделиться</Button>
          </FormGroup>
        </Form>

        {newsFeedContent}
      </div>
    </div>
  );
}
