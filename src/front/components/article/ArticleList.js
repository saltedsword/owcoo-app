import ArticleActions from '../../actions/ArticleActions';
import { connect } from 'react-redux';
import ArticleList from './ArticleList.jsx';
import PropTypes from 'prop-types';
import frontInit from '../common/frontInit';

const handlePage = (currentPage, searchParams, dispatch) => {
  searchParams.set('p', currentPage);
  dispatch(ArticleActions.articleList('?' + searchParams.toString()));
}

const mapStateToProps = state => {
  return state.frontArticleList;
}

const mapDispatchToProps = dispatch => {
  return {
    handlePage: (currentPage, searchParams) => handlePage(currentPage, searchParams, dispatch),
    articleList: searchString => dispatch(ArticleActions.articleList(searchString)),
    frontInit: (payload) => frontInit(payload, dispatch),
  }
}

const container = connect(mapStateToProps, mapDispatchToProps)(ArticleList);
container.contextTypes = { store: PropTypes.object };
export default container;