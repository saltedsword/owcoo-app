import FrontHeaderActions from '../../actions/FrontHeaderActions';
import { connect } from 'react-redux';
import FrontHeader from './FrontHeader.jsx';
import PropTypes from 'prop-types';

const mapStateToProps = state => {
  return state.frontHeader;
}

const mapDispatchToProps = dispatch => {
  return {
    frontHeaderInit: () => dispatch(FrontHeaderActions.frontHeaderInit()),
  }
}

const container = connect(mapStateToProps, mapDispatchToProps)(FrontHeader);
container.contextTypes = { store: PropTypes.object };
export default container;