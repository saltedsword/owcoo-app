import FrontFooterActions from '../../actions/FrontFooterActions';
import { connect } from 'react-redux';
import FrontFooter from './FrontFooter.jsx';
import PropTypes from 'prop-types';

const mapStateToProps = state => {
  return state.frontFooter;
}

const mapDispatchToProps = dispatch => {
  return {
    frontFooterInit: () => dispatch(FrontFooterActions.frontFooterInit()),
  }
}

const container = connect(mapStateToProps, mapDispatchToProps)(FrontFooter);
container.contextTypes = { store: PropTypes.object };
export default container;