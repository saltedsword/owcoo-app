import { connect } from 'react-redux';
import AdminHeader from './AdminHeader.jsx';
import PropTypes from 'prop-types';

const mapStateToProps = state => {
  return state.header;
}

const container = connect(mapStateToProps, null)(AdminHeader);
container.contextTypes = { store: PropTypes.object };
export default container;