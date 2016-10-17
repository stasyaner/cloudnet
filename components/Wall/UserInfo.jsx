import React, { PropTypes } from 'react';
import { Col } from 'react-bootstrap';
import UploadAvatarModal from './UploadAvatarModal';

function getStatusFromTimestamp(lastActiveTimestamp) {
  let status;
  if (lastActiveTimestamp) {
    const wasActiv = new Date() - lastActiveTimestamp;
    if (wasActiv < (900 * 1000)) {
      status = 'Online';
    } else {
      status = Math.floor((new Date() - new Date(lastActiveTimestamp)) / (1000 * 60));
      if (status >= 60) {
        status *= 1 / 60;
        if (status >= 24) {
          status *= 1 / 24;
          if (status >= 7) {
            const lastActiveTimestampDate = new Date(lastActiveTimestamp);
            status = lastActiveTimestampDate.toLocaleString('ru', {
              year: 'numeric',
              day: 'numeric',
              month: 'long',
            });
          } else {
            status = Math.floor(status);
            if (status < 2) {
              status = 'вчера';
            } else if (status >= 5) {
              status += ' дней назад';
            } else {
              status += ' дня назад';
            }
          }
        } else {
          status = Math.floor(status);
          if (status % 10 === 1) {
            status = 'час назад';
          } else if ((status > 1) && (status < 5)) {
            status += ' часа назад';
          } else {
            status += ' часов назад';
          }
        }
      } else {
        if ((status % 10 === 1) && (status !== 11)) {
          status += ' минуту назад';
        }
        status += ' минут назад';
      }
    }
  } else {
    status = '';
  }

  return status;
}

const UserInfo = (props) => {
  let { birthday } = props.userInfo;
  const { city, displayName, university, signature, avatar,
    lastActiveTimestamp } = props.userInfo;
  let age;

  const status = getStatusFromTimestamp(lastActiveTimestamp);

  let avatarLink = '';
  if (avatar && avatar.wall) {
    avatarLink = avatar.wall;
  }

  let changeAvatar = '';
  let avatarContent = <img alt="avatar" src={avatarLink} />;
  if (props.userInfo.id === props.currentUserUid) {
    avatarContent = (
      <a onClick={props.toggleModal}>
        <img alt="avatar" src={avatarLink} />
      </a>
    );
    changeAvatar = (
      <UploadAvatarModal
        showModal={props.showModal}
        toggleModal={props.toggleModal}
        uploadAvatar={props.uploadAvatar}
      />
    );
  }

  if (birthday) {
    birthday = new Date(birthday);
    age = new Date().getFullYear() - birthday.getFullYear();
    if (birthday.toLocaleString) {
      birthday = birthday.toLocaleString('ru', {
        year: 'numeric',
        day: 'numeric',
        month: 'long',
      });
    } else {
      birthday = `${birthday.getDay()}.${birthday.getMonth()}.${birthday.getFullYear()}`;
    }
  }

  return (
    <div id="the-wall-head">
      <div id="the-wall-avatar">
        {avatarContent}
        {changeAvatar}
      </div>

      <div id="the-wall-profile-info">
        <div id="the-wall-profile-info-name">{displayName}</div>
        <div id="the-wall-profile-info-status">{status}</div>
        <div id="the-wall-profile-info-signature">{signature}</div>
        <div id="the-wall-profile-info-delimiter"><hr /></div>

        <Col md={3}>Родился:</Col>
        <Col md={9}>
          <div id="the-wall-profile-info-birthday">
            {birthday}, {age} год(-а)</div>
        </Col>

        <Col md={3}>Город:</Col>
        <Col md={9}>
          <div id="the-wall-profile-info-city">{city}</div>
        </Col>

        <Col md={3}>Место учебы:</Col>
        <Col md={9}>
          <div id="the-wall-profile-info-univercity">{university}</div>
        </Col>
      </div>
    </div>
  );
};

UserInfo.propTypes = {
  userInfo: PropTypes.objectOf(
    PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.object,
    ])
  ).isRequired,
  currentUserUid: PropTypes.string.isRequired,
  showModal: PropTypes.bool.isRequired,
  uploadAvatar: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default UserInfo;
