import DownloadActions from '../../actions/DownloadActions';
import { connect } from 'react-redux';
import DownloadList from './DownloadList.jsx';
import PropTypes from 'prop-types';
import frontInit from '../common/frontInit';

const handlePage = (currentPage, searchParams, dispatch) => {
  searchParams.set('p', currentPage);
  dispatch(DownloadActions.downloadList('?' + searchParams.toString()));
}

const mapStateToProps = state => {
  return state.frontDownloadList;
}

const mapDispatchToProps = dispatch => {
  return {
    handlePage: (currentPage, searchParams) => handlePage(currentPage, searchParams, dispatch),
    downloadList: searchString => dispatch(DownloadActions.downloadList(searchString)),
    frontInit: (payload) => frontInit(payload, dispatch),
  }
}

const container = connect(mapStateToProps, mapDispatchToProps)(DownloadList);
container.contextTypes = { store: PropTypes.object };
export default container;