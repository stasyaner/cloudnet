import React, {Component, PropTypes} from 'react';
import {Form, FormGroup, FormControl, Button, Panel, Glyphicon,
  Fade, OverlayTrigger, Tooltip} from 'react-bootstrap';

  function getNewsFeed(news, authorId, currentUserId, users) {
    let newsFeed = [];
    if (news) {
      for(let key in news) {
        if (news[key].author === authorId) {
          let likes = news[key].likes ? Object.keys(news[key].likes) : null;
          let likesNum;
          likes ? likesNum = likes.length : 0;

          let whoLikesContent;
          if (likes) {
            whoLikesContent = likes.map(userId => {
              if (users[userId]) {
                return (
                  <img
                    className='smallAvatar'
                    key={userId}
                    src={users[userId].avatar.thumbnails.small} />
                );
              }
            });
          }

          let whoLikes = (
            <Tooltip id='whoLikes'>
              {whoLikesContent.slice(0, 5)}
            </Tooltip>
          );

          let footerContent= (
            <div className='likes'>
              <OverlayTrigger placement='top' overlay={whoLikes} rootClose={true}>
                <a onClick={
                  (event) => {
                    event.preventDefault();
                    props.like(news[key].id);
                  }
                }>
                  {likesNum}
                  {' '}
                  <Glyphicon glyph='heart'/>Лайков
                </a>
              </OverlayTrigger>
            </div>
          );

          let deleteNews = '';
          if (authorId === currentUserId) {
            deleteNews = (
              <div className='the-wall-remove-news'><a
                onClick={
                  (event) => {
                    event.preventDefault();
                    if (confirm('Вы действительно хотите удалить новость?')) {
                      props.removeNews(news[key].id);
                    }
                  }
                }>
                <Glyphicon glyph='remove'/>
              </a></div>
            );
        }

        newsFeed.push(
          <Panel footer={footerContent} key={news[key].id}>
            {deleteNews}
            {news[key].content}
          </Panel>
        );

        }
      }
    }
    return newsFeed;
  }

export default props => {

  let publishNewsForm = '';
  if (props.userInfo.id === props.user.uid) {
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
            contentEditable='true'
            onFocus={props.toggleFade}
            onBlur={props.toggleFade}>
          </div>
        </FormGroup>

        <Fade in={props.fade}>
          <FormGroup>
            <Button id='add-pic'><Glyphicon glyph='picture'/></Button>
            <Button id='add-video'><Glyphicon glyph='film'/></Button>
            <Button id='add-file'><Glyphicon glyph='file'/></Button>
            <Button type='submit'>Поделиться</Button>
          </FormGroup>
        </Fade>
      </Form>
    );
  }

  return (
    <div id='the-wall-news-feed'>
      {publishNewsForm}
      {getNewsFeed(props.news,
        props.userInfo.id, props.user.uid, props.users)}
    </div>
  );
}
