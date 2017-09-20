import FrontActions from '../actions/FrontActions';
import { connect } from 'react-redux';
import Front from './Front.jsx';
import PropTypes from 'prop-types';

const mapStateToProps = state => {
  return state.front;
}

const mapDispatchToProps = dispatch => {
  return {
    frontInit: () => dispatch(FrontActions.frontInit()),
  }
}

const container = connect(mapStateToProps, mapDispatchToProps)(Front);
container.contextTypes = { store: PropTypes.object };
export default container;