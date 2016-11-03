import React, { PropTypes } from 'react';
import { Form, FormGroup, Button, Panel, Glyphicon, Fade, OverlayTrigger, Tooltip } from 'react-bootstrap';

function getNewsFeed(news, authorId, currentUserId, users, like, removeNews) {
  const newsFeed = [];
  if (news) {
    Object.keys(news).forEach((key) => {
      if (news[key].author === authorId) {
        const likes = news[key].likes ? Object.keys(news[key].likes) : null;
        const likesNum = likes ? likes.length : 0;

        let whoLikes = '';
        let whoLikesContent;

        if (likes) {
          whoLikesContent = likes.map((userId) => {
            if (users[userId]) {
              return (
                <img
                  alt="avatar"
                  className="smallAvatar"
                  key={userId}
                  src={users[userId].avatar.small}
                />
              );
            }
            return null;
          });
        }

        whoLikes = (
          <Tooltip id="whoLikes">
            {whoLikesContent ? whoLikesContent.slice(0, 5) : 'нет лайков'}
          </Tooltip>
        );

        const footerContent = (
          <div className="likes">
            <OverlayTrigger
              placement="top" overlay={whoLikes}
              rootClose
            >
              <a
                onClick={
                  (event) => {
                    event.preventDefault();
                    like(news[key].id);
                  }
                }
              >
                {likesNum}
                {' '}
                <Glyphicon glyph="heart" /> Лайков
              </a>
            </OverlayTrigger>
          </div>
        );

        let deleteNews = '';
        if (authorId === currentUserId) {
          deleteNews = (
            <div className="the-wall-remove-news">
              <a
                onClick={
                  (event) => {
                    event.preventDefault();
                    if (confirm("Вы действительно хотите удалить новость?")) {
                      removeNews(news[key].id);
                    }
                  }
                }
              >
                <Glyphicon glyph="remove" />
              </a>
            </div>
          );
        }

        newsFeed.push(
          <Panel footer={footerContent} key={news[key].id}>
            {deleteNews}
            {news[key].content}
          </Panel>
        );
      }
    });
  }
  return newsFeed;
}

const NewsFeed = (props) => {
  let publishNewsForm = '';
  if (props.userInfoId === props.currentUserUid) {
    const onSubmit = (event) => {
      event.preventDefault();
      const textArea = document.getElementById('the-wall-publish-news-textarea');
      const content = textArea.textContent;
      if (content) {
        props.addNews({
          content,
          timestamp: new Date().getTime(),
        });
        textArea.innerText = '';
      }
    };

    publishNewsForm = (
      <Form id="the-wall-publish-news-form" onSubmit={onSubmit}>
        <FormGroup controlId="the-wall-publish-news-form-text">
          <div
            id="the-wall-publish-news-textarea"
            placeholder="Поделиться новостью"
            contentEditable="true"
            onFocus={props.toggleFade}
            onBlur={props.toggleFade}
          />
        </FormGroup>

        <Fade in={props.fade}>
          <FormGroup>
            <Button id="add-pic"><Glyphicon glyph="picture" /></Button>
            <Button id="add-video"><Glyphicon glyph="film" /></Button>
            <Button id="add-file"><Glyphicon glyph="file" /></Button>
            <Button type="submit">Поделиться</Button>
          </FormGroup>
        </Fade>
      </Form>
    );
  }

  return (
    <div id="the-wall-news-feed">
      {publishNewsForm}
      {getNewsFeed(props.news,
        props.userInfoId, props.currentUserUid, props.users, props.like,
        props.removeNews)}
    </div>
  );
};

NewsFeed.propTypes = {
  fade: PropTypes.bool.isRequired,
  currentUserUid: PropTypes.string.isRequired,
  users: PropTypes.objectOf(PropTypes.object).isRequired,
  userInfoId: PropTypes.string.isRequired,
  news: PropTypes.objectOf(PropTypes.object).isRequired,
  addNews: PropTypes.func.isRequired,
  removeNews: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired,
  toggleFade: PropTypes.func.isRequired,
};

export default NewsFeed;