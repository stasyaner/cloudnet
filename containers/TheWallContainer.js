import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import TheWall from '../components/TheWall';
import {fetchUserInfo, fetchUserNews, addNews, removeNews,
  like, fetchUserFriends} from '../actions';

class CloudNetContainer extends Component{
  constructor() {
    super(...arguments);
  }

  componentWillMount() {
    this.props.fetchUserInfo();
    this.props.fetchUserNews();
    this.props.fetchUserFriends();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userId !== nextProps.userId) {
      nextProps.fetchUserInfo();
      nextProps.fetchUserNews();
      nextProps.fetchUserFriends();
    }
  }

  render() {
    return (
      <TheWall
        userInfo={this.props.userInfo}
        users={this.props.users}
        news={this.props.news}
        addNews={this.props.addNews}
        removeNews={this.props.removeNews}
        like={this.props.like}/>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userId: ownProps.params.userId,
    users: state.entities.users,
    userInfo: state.entities.users[ownProps.params.userId] || {},
    news: state.entities.news
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUserInfo: () => dispatch(fetchUserInfo(ownProps.params.userId)),
    fetchUserNews: () => dispatch(fetchUserNews(ownProps.params.userId)),
    addNews: news => dispatch(addNews(ownProps.params.userId, news)),
    removeNews: newsId => dispatch(removeNews(ownProps.params.userId, newsId)),
    like: newsId => dispatch(like(ownProps.params.userId, newsId)),
    fetchUserFriends: () => dispatch(fetchUserFriends(ownProps.params.userId))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)
  (CloudNetContainer);
