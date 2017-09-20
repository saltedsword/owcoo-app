import FetchUtil from '../../utils/frontFetch';
import CONFIG from '../../config';

const ArticleActions = {

  showArticle: (payload) => async (dispatch, getState) => {
    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}front/showArticle/${payload}`);
    dispatch({ type: 'SHOW_ARTICLE', data: res.data });
  },

  articleList: (payload) => async (dispatch, getState) => {
    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}front/articleList${payload}`);
    const { list, currentPage, totalCount } = res.data;
    const data = {
      data: list,
      currentPage: currentPage,
      total: totalCount
    }
    dispatch({ type: 'ARTICLE_LIST', data: data });
  },

};

export default ArticleActions;