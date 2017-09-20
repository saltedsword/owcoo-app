import { findDOMNode } from 'react-dom';
import { MessageBox } from 'element-react';
import 'element-theme-default';
import PictureActions from '../../actions/PictureActions';
import { connect } from 'react-redux';
import PictureList from './PictureList.jsx';
import PropTypes from 'prop-types';

// HeaderActions.headerInit([{name: '内容'}, {name: '管理', url: '/admin/manage'}, {name: '编辑文章'}]);

const handleDel = (id, dispatch) => {
  MessageBox.confirm('确定要删除吗?', '提示', {
    type: 'warning'
  }).then(() => {
    dispatch(PictureActions.delPicture(id));
  }).catch((err) => { console.log(err) });
}

const handleSelect = (value, searchParams, dispatch) => {
  searchParams.set('p', 1);
  searchParams.set('column', value);
  dispatch(PictureActions.pictureList('?' + searchParams.toString()));
}

const handleSort = (command, searchParams, dispatch) => {
  searchParams.set('p', 1);
  searchParams.set('sortBy', command);
  dispatch(PictureActions.pictureList('?' + searchParams.toString()));
}

const handlePage = (currentPage, searchParams, dispatch) => {
  searchParams.set('p', currentPage);
  dispatch(PictureActions.pictureList('?' + searchParams.toString()));
}

const search = (searchInput, searchParams, dispatch) => {

  const node = findDOMNode(searchInput);
  const title = node.lastChild.value;

  searchParams.set('title', title);
  dispatch(PictureActions.pictureList('?' + searchParams.toString()));
}

const mapStateToProps = state => {
  return state.pictureList;
}

const mapDispatchToProps = dispatch => {
  return {
    handleDel: id => handleDel(id, dispatch),
    handleSelect: (value, searchParams) => handleSelect(value, searchParams, dispatch),
    handleSort: (command, searchParams) => handleSort(command, searchParams, dispatch),
    handlePage: (currentPage, searchParams) => handlePage(currentPage, searchParams, dispatch),
    search: (searchInput, searchParams) => search(searchInput, searchParams, dispatch),
    pictureList: searchString => dispatch(PictureActions.pictureList(searchString)),
    headerInit: (paths) => dispatch({type: 'HEADER_INIT', paths}),
  }
}

const container = connect(mapStateToProps, mapDispatchToProps)(PictureList);
container.contextTypes = { store: PropTypes.object };
export default container;