import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {startFetchingAction, fetchData} from '../actions';
import Hello from '../components/Hello';

class Index extends Component{
  constructor(){
    super(...arguments);
  }

  componentWillMount() {
    //this.props.startFetching();
    this.props.fetchData(this.props.firebase, 'articles/1/name');
  }

  render() {
    return (<Hello name={this.props.name}/>);
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    firebase: state.firebase,
    name: state.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startFetching: () => dispatch(startFetchingAction()),
    fetchData: (firebase, ref) => dispatch(fetchData(firebase, ref)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)
  (Index);
