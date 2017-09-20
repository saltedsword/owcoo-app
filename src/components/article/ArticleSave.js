import ArticleActions from '../../actions/ArticleActions';
import { connect } from 'react-redux';
import ArticleSave from './ArticleSave.jsx';
import PropTypes from 'prop-types';

// HeaderActions.headerInit([{name: '内容'}, {name: '管理', url: '/admin/manage'}, {name: '编辑文章'}]);
const handleSubmit = function (form, dispatch) {
  form.validate((valid) => {
    if (valid) {
      dispatch(ArticleActions.saveArticle());
    } else {
      console.log('error submit!!');
      return false;
    }
  });
}

const mapStateToProps = state => {
  return state.saveArticle;
}

const mapDispatchToProps = dispatch => {
  return {
    articleChange: payload => dispatch({ type: 'ARTICLE_CHANGE', payload: payload }),
    handleSubmit: form => handleSubmit(form, dispatch),
    articleInit: payload => dispatch(ArticleActions.articleInit(payload)),
    headerInit: (paths) => dispatch({type: 'HEADER_INIT', paths}),
  }
}
const container = connect(mapStateToProps, mapDispatchToProps)(ArticleSave);
container.contextTypes = { store: PropTypes.object };
export default container;