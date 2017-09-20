import { connect } from 'react-redux';
import Home from './Home.jsx';
import PropTypes from 'prop-types';

const mapStateToProps = state => {
  return state.home || {};
}

const mapDispatchToProps = dispatch => {
  return {
    headerInit: (paths) => dispatch({type: 'HEADER_INIT', paths}),
  }
}

const container = connect(mapStateToProps, mapDispatchToProps)(Home);
container.contextTypes = { store: PropTypes.object };
export default container;