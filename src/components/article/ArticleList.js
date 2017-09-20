import { findDOMNode } from 'react-dom';
import { MessageBox } from 'element-react';
import 'element-theme-default';
import ArticleActions from '../../actions/ArticleActions';
import { connect } from 'react-redux';
import ArticleList from './ArticleList.jsx';
import PropTypes from 'prop-types';

const handleDel = (id, dispatch) => {
  MessageBox.confirm('确定要删除吗?', '提示', {
    type: 'warning'
  }).then(() => {
    dispatch(ArticleActions.delArticle(id));
  }).catch((err) => { console.log(err) });
}

const handleSelect = (value, searchParams, dispatch) => {
  searchParams.set('p', 1);
  searchParams.set('column', value);
  dispatch(ArticleActions.articleList('?' + searchParams.toString()));
}

const handleSort = (command, searchParams, dispatch) => {
  searchParams.set('p', 1);
  searchParams.set('sortBy', command);
  dispatch(ArticleActions.articleList('?' + searchParams.toString()));
}

const handlePage = (currentPage, searchParams, dispatch) => {
  searchParams.set('p', currentPage);
  dispatch(ArticleActions.articleList('?' + searchParams.toString()));
}

const search = (searchInput, searchParams, dispatch) => {

  const node = findDOMNode(searchInput);
  const title = node.lastChild.value;

  searchParams.set('title', title);
  dispatch(ArticleActions.articleList('?' + searchParams.toString()));
}

const mapStateToProps = state => {
  return state.articleList;
}

const mapDispatchToProps = dispatch => {
  return {
    handleDel: id => handleDel(id, dispatch),
    handleSelect: (value, searchParams) => handleSelect(value, searchParams, dispatch),
    handleSort: (command, searchParams) => handleSort(command, searchParams, dispatch),
    handlePage: (currentPage, searchParams) => handlePage(currentPage, searchParams, dispatch),
    search: (searchInput, searchParams) => search(searchInput, searchParams, dispatch),
    articleList: searchString => dispatch(ArticleActions.articleList(searchString)),
    headerInit: (paths) => dispatch({type: 'HEADER_INIT', paths}),
  }
}

const container = connect(mapStateToProps, mapDispatchToProps)(ArticleList);
container.contextTypes = { store: PropTypes.object };
export default container;