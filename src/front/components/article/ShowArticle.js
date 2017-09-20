import ArticleActions from '../../actions/ArticleActions';
import { connect } from 'react-redux';
import ShowArticle from './ShowArticle.jsx';
import PropTypes from 'prop-types';
import frontInit from '../common/frontInit';

const mapStateToProps = state => {
  return state.frontShowArticle;
}

const mapDispatchToProps = dispatch => {
  return {
    showArticle: payload => dispatch(ArticleActions.showArticle(payload)),
    frontInit: (payload) => frontInit(payload, dispatch),
  }
}
const container = connect(mapStateToProps, mapDispatchToProps)(ShowArticle);
container.contextTypes = { store: PropTypes.object };
export default container;