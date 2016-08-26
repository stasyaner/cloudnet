import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {initStoreAction, checkAuthentication} from '../actions';
import NewsFeed from '../components/NewsFeed';

class NewsFeedContainer extends Component{
  constructor() {
    super(...arguments);
  }

  componentWillMount() {
    this.props.checkAuthentication(this.props.firebase);
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
    checkAuthentication: (firebase) => dispatch(checkAuthentication(firebase))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)
  (NewsFeedContainer);
