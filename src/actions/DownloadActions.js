import FetchUtil from '../utils/fetch';
import CONFIG from '../config';

const DownloadActions = {

  saveDownload: () => async (dispatch, getState) => {
      dispatch({ type: 'SAVE_DOWNLOAD', status: 'loading' });

      const download = getState().saveDownload.download;
      const res = await FetchUtil.postData(`${CONFIG.BASE_URL}download/save`, JSON.stringify({download}));
      if (res === false) return;
      if (res.code !== 200) return dispatch({ type: 'SAVE_DOWNLOAD', status: 'error', msg: res.msg });
      const pushUrl = `/admin/downloadList?column=${download.column}`;
      dispatch({ type: 'SAVE_DOWNLOAD', status: 'success', msg:res.msg, pushUrl: pushUrl });
  },

  downloadInit: (payload) => async (dispatch, getState) => {
    dispatch({ type: 'DOWNLOAD_INIT', status: 'loading' });

    const queryString = payload.id ? `/${payload.id}?c=${payload.c || ''}` : `?c=${payload.c || ''}`;
    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}download/saveInit${queryString}`)
    if (res === false) return;
    if (res.code !== 200) return dispatch({ type: 'DOWNLOAD_INIT', status: 'error', msg: res.msg });
    dispatch({ type: 'DOWNLOAD_INIT', status: 'success', msg:res.msg, data: res.data });    
  },

  downloadList: (payload) => async (dispatch, getState) => {
    dispatch({ type: 'DOWNLOAD_LIST', status: 'loading' });

    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}download/list${payload}`);
    if (res === false) return;
    if (res.code !== 200) return dispatch({ type: 'DOWNLOAD_LIST', status: 'error', msg: res.msg });

    const { list, options, selectedOptions, currentPage, totalCount } = res.data;
    options.unshift({value:'', label: '所有栏目'});
    const data = {
      data: list,
      options: options,
      selectedOptions: selectedOptions,
      currentPage: currentPage,
      total: totalCount
    }
    dispatch({ type: 'DOWNLOAD_LIST', status: 'success', msg:res.msg, data: data });  
  },

  delDownload: (payload) => async (dispatch, getState) => {
    dispatch({ type: 'DEL_DOWNLOAD', status: 'loading' });

    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}download/del/${payload}`);
    if (res === false) return;
    if (res.code !== 200) return dispatch({ type: 'DEL_DOWNLOAD', status: 'error', msg: res.msg });
    dispatch({ type: 'DEL_DOWNLOAD', status: 'success', msg:res.msg, deleted: res.deleted });    
  },
};

export default DownloadActions;