import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import NewsFeed from '../components/NewsFeed';

class NewsFeedContainer extends Component{
  constructor(...restParams) {
    super(...restParams);
  }

  render() {
    return (
      <div>
        <NewsFeed user={this.props.user} />
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    firebase: state.firebase,
    user: state.user,
  }
);

export default connect(mapStateToProps)(NewsFeedContainer);
