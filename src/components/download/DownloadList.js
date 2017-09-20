import { findDOMNode } from 'react-dom';
import { MessageBox } from 'element-react';
import 'element-theme-default';
import DownloadActions from '../../actions/DownloadActions';
import { connect } from 'react-redux';
import DownloadList from './DownloadList.jsx';
import PropTypes from 'prop-types';

// HeaderActions.headerInit([{name: '内容'}, {name: '管理', url: '/admin/manage'}, {name: '编辑文章'}]);

const handleDel = (id, dispatch) => {
  MessageBox.confirm('确定要删除吗?', '提示', {
    type: 'warning'
  }).then(() => {
    dispatch(DownloadActions.delDownload(id));
  }).catch((err) => { console.log(err) });
}

const handleSelect = (value, searchParams, dispatch) => {
  searchParams.set('p', 1);
  searchParams.set('column', value);
  dispatch(DownloadActions.downloadList('?' + searchParams.toString()));
}

const handleSort = (command, searchParams, dispatch) => {
  searchParams.set('p', 1);
  searchParams.set('sortBy', command);
  dispatch(DownloadActions.downloadList('?' + searchParams.toString()));
}

const handlePage = (currentPage, searchParams, dispatch) => {
  searchParams.set('p', currentPage);
  dispatch(DownloadActions.downloadList('?' + searchParams.toString()));
}

const search = (searchInput, searchParams, dispatch) => {

  const node = findDOMNode(searchInput);
  const title = node.lastChild.value;

  searchParams.set('title', title);
  dispatch(DownloadActions.downloadList('?' + searchParams.toString()));
}

const mapStateToProps = state => {
  return state.downloadList;
}

const mapDispatchToProps = dispatch => {
  return {
    handleDel: id => handleDel(id, dispatch),
    handleSelect: (value, searchParams) => handleSelect(value, searchParams, dispatch),
    handleSort: (command, searchParams) => handleSort(command, searchParams, dispatch),
    handlePage: (currentPage, searchParams) => handlePage(currentPage, searchParams, dispatch),
    search: (searchInput, searchParams) => search(searchInput, searchParams, dispatch),
    downloadList: searchString => dispatch(DownloadActions.downloadList(searchString)),
    headerInit: (paths) => dispatch({type: 'HEADER_INIT', paths}),
  }
}

const container = connect(mapStateToProps, mapDispatchToProps)(DownloadList);
container.contextTypes = { store: PropTypes.object };
export default container;