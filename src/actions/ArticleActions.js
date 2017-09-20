import FetchUtil from '../utils/fetch';
import CONFIG from '../config';

const ArticleActions = {

  saveArticle: () => async (dispatch, getState) => {
      dispatch({ type: 'SAVE_ARTICLE', status: 'loading' });

      const article = getState().saveArticle.article;
      const res = await FetchUtil.postData(`${CONFIG.BASE_URL}article/save`, JSON.stringify({article}));
      if (res === false) return;
      if (res.code !== 200) return dispatch({ type: 'SAVE_ARTICLE', status: 'error', msg: res.msg });
      const pushUrl = `/admin/articleList?column=${article.column}`;
      dispatch({ type: 'SAVE_ARTICLE', status: 'success', msg:res.msg, pushUrl: pushUrl });
  },

  articleInit: (payload) => async (dispatch, getState) => {
    dispatch({ type: 'ARTICLE_INIT', status: 'loading' });

    const queryString = payload.id ? `/${payload.id}?c=${payload.c || ''}` : `?c=${payload.c || ''}`;
    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}article/saveInit${queryString}`)
    if (res === false) return;
    if (res.code !== 200) return dispatch({ type: 'ARTICLE_INIT', status: 'error', msg: res.msg });
    dispatch({ type: 'ARTICLE_INIT', status: 'success', msg:res.msg, data: res.data });    
  },

  articleList: (payload) => async (dispatch, getState) => {
    dispatch({ type: 'ARTICLE_LIST', status: 'loading' });

    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}article/list${payload}`);
    if (res === false) return;
    if (res.code !== 200) return dispatch({ type: 'ARTICLE_LIST', status: 'error', msg: res.msg });

    const { list, options, selectedOptions, currentPage, totalCount } = res.data;
    options.unshift({value:'', label: '所有栏目'});
    const data = {
      data: list,
      options: options,
      selectedOptions: selectedOptions,
      currentPage: currentPage,
      total: totalCount
    }
    dispatch({ type: 'ARTICLE_LIST', status: 'success', msg:res.msg, data: data });  
  },

  delArticle: (payload) => async (dispatch, getState) => {
    dispatch({ type: 'DEL_ARTICLE', status: 'loading' });

    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}article/del/${payload}`);
    if (res === false) return;
    if (res.code !== 200) return dispatch({ type: 'DEL_ARTICLE', status: 'error', msg: res.msg });
    dispatch({ type: 'DEL_ARTICLE', status: 'success', msg:res.msg, deleted: res.deleted });    
  },
};

export default ArticleActions;