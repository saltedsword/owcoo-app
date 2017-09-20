import FetchUtil from '../utils/fetch';
import CONFIG from '../config';

const SummaryActions = {

  saveSummary: () => async (dispatch, getState) => {
      dispatch({ type: 'SAVE_SUMMARY', status: 'loading' });

      const summary = getState().saveSummary.summary;
      const res = await FetchUtil.postData(`${CONFIG.BASE_URL}summary/save`, JSON.stringify({summary}));
      if (res === false) return;
      if (res.code !== 200) return dispatch({ type: 'SAVE_SUMMARY', status: 'error', msg: res.msg });
      const pushUrl = `/admin/summaryList`;
      dispatch({ type: 'SAVE_SUMMARY', status: 'success', msg:res.msg, pushUrl: pushUrl });
  },

  summaryInit: (payload) => async (dispatch, getState) => {
    dispatch({ type: 'SUMMARY_INIT', status: 'loading' });

    const queryString = payload.id ? `/${payload.id}?c=${payload.c || ''}` : `?c=${payload.c || ''}`;
    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}summary/saveInit${queryString}`)
    if (res === false) return;
    if (res.code !== 200) return dispatch({ type: 'SUMMARY_INIT', status: 'error', msg: res.msg });
    dispatch({ type: 'SUMMARY_INIT', status: 'success', msg:res.msg, data: res.data });    
  },

  summaryList: (payload) => async (dispatch, getState) => {
    dispatch({ type: 'SUMMARY_LIST', status: 'loading' });

    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}summary/list${payload}`);
    if (res === false) return;
    if (res.code !== 200) return dispatch({ type: 'SUMMARY_LIST', status: 'error', msg: res.msg });

    const { list, options, selectedOptions, currentPage, totalCount } = res.data;
    options.unshift({value:'', label: '所有栏目'});
    const data = {
      data: list,
      options: options,
      selectedOptions: selectedOptions,
      currentPage: currentPage,
      total: totalCount
    }
    dispatch({ type: 'SUMMARY_LIST', status: 'success', msg:res.msg, data: data });  
  },

};

export default SummaryActions;