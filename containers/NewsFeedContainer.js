import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
//import {checkAuthentication} from '../actions';
import NewsFeed from '../components/NewsFeed';

class NewsFeedContainer extends Component{
  constructor() {
    super(...arguments);
  }

  render() {
    return (
      <div>
        <NewsFeed user={this.props.user}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    firebase: state.firebase,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps,mapDispatchToProps)
  (NewsFeedContainer);
