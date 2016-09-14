import React, {PropTypes} from 'react';
import {Form, FormGroup, FormControl, Button, Panel, Glyphicon} from 'react-bootstrap';
import TheWallFriends from './TheWallFriends';

export default (props) => {

  let newsFeedContent = [];
  if (props.news) {
    for(let key in props.news) {
      if (props.news[key].author === props.userInfo.id) {
      let footerContent= (
        <div className='likes'>
          <a onClick={
            (event) => {
              event.preventDefault();
              props.like(props.news[key].id);
            }
          }>
            {props.news[key].likes ? Object.keys(props.news[key].likes).length : 0}
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
  }

  let publishNewsForm = '';
  //TODO: remove hardcode
  if (props.userInfo.id === props.user.id) {
    let onSubmit = (event) => {
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

    publishNewsForm = (
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
    );
  }

  return (
    <div id='the-wall-news-feed'>

      {publishNewsForm}

      {newsFeedContent}
    </div>
  );
}
