import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
// import {startFetchingAction, fetchData} from '../actions';
import LeftMenu from '../components/LeftMenu';
import TopMenu from '../components/TopMenu';

class CloudNetContainer extends Component{
  constructor() {
    super(...arguments);
  }

  // componentWillMount() {
  //   this.props.fetchData(this.props.firebase, 'articles/1/name');
  // }

  render() {
    return (
      <div>
        <TopMenu />
        <LeftMenu />
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    // firebase: state.firebase,
    // name: state.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startFetching: () => dispatch(startFetchingAction()),
    // fetchData: (firebase, ref) => dispatch(fetchData(firebase, ref)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)
  (CloudNetContainer);
