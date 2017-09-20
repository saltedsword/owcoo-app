import { connect } from 'react-redux';
import FrontContent from './FrontContent.jsx';
import PropTypes from 'prop-types';

const mapStateToProps = state => {
  return state.frontContent;
}

const container = connect(mapStateToProps, null)(FrontContent);
container.contextTypes = { store: PropTypes.object };
export default container;