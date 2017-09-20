import DownloadActions from '../../actions/DownloadActions';
import { connect } from 'react-redux';
import ShowDownload from './ShowDownload.jsx';
import PropTypes from 'prop-types';
import frontInit from '../common/frontInit';

const mapStateToProps = state => {
  return state.frontShowDownload;
}

const mapDispatchToProps = dispatch => {
  return {
    showDownload: payload => dispatch(DownloadActions.showDownload(payload)),
    frontInit: (payload) => frontInit(payload, dispatch),
  }
}
const container = connect(mapStateToProps, mapDispatchToProps)(ShowDownload);
container.contextTypes = { store: PropTypes.object };
export default container;