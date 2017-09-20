import HomeActions from '../../actions/HomeActions';
import { connect } from 'react-redux';
import Home from './Home.jsx';
import PropTypes from 'prop-types';

const mapStateToProps = state => {
  return state.frontHome;
}

const mapDispatchToProps = dispatch => {
  return {
    frontHomeInit: () => dispatch(HomeActions.frontHomeInit()),
    // headerInit: (paths) => dispatch({type: 'HEADER_INIT', paths}),
  }
}

const container = connect(mapStateToProps, mapDispatchToProps)(Home);
container.contextTypes = { store: PropTypes.object };
export default container;