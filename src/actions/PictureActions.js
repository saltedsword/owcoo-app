import FetchUtil from '../utils/fetch';
import CONFIG from '../config';

const PictureActions = {

  savePicture: () => async (dispatch, getState) => {
      dispatch({ type: 'SAVE_PICTURE', status: 'loading' });

      const picture = getState().savePicture.picture;
      const res = await FetchUtil.postData(`${CONFIG.BASE_URL}picture/save`, JSON.stringify({picture}));
      if (res === false) return;
      if (res.code !== 200) return dispatch({ type: 'SAVE_PICTURE', status: 'error', msg: res.msg });
      const pushUrl = `/admin/pictureList?column=${picture.column}`;
      dispatch({ type: 'SAVE_PICTURE', status: 'success', msg:res.msg, pushUrl: pushUrl });
  },

  pictureInit: (payload) => async (dispatch, getState) => {
    dispatch({ type: 'PICTURE_INIT', status: 'loading' });

    const queryString = payload.id ? `/${payload.id}?c=${payload.c || ''}` : `?c=${payload.c || ''}`;
    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}picture/saveInit${queryString}`)
    if (res === false) return;
    if (res.code !== 200) return dispatch({ type: 'PICTURE_INIT', status: 'error', msg: res.msg });
    dispatch({ type: 'PICTURE_INIT', status: 'success', msg:res.msg, data: res.data });    
  },

  pictureList: (payload) => async (dispatch, getState) => {
    dispatch({ type: 'PICTURE_LIST', status: 'loading' });

    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}picture/list${payload}`);
    if (res === false) return;
    if (res.code !== 200) return dispatch({ type: 'PICTURE_LIST', status: 'error', msg: res.msg });

    const { list, options, selectedOptions, currentPage, totalCount } = res.data;
    options.unshift({value:'', label: '所有栏目'});
    const data = {
      data: list,
      options: options,
      selectedOptions: selectedOptions,
      currentPage: currentPage,
      total: totalCount
    }
    dispatch({ type: 'PICTURE_LIST', status: 'success', msg:res.msg, data: data });  
  },

  delPicture: (payload) => async (dispatch, getState) => {
    dispatch({ type: 'DEL_PICTURE', status: 'loading' });

    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}picture/del/${payload}`);
    if (res === false) return;
    if (res.code !== 200) return dispatch({ type: 'DEL_PICTURE', status: 'error', msg: res.msg });
    dispatch({ type: 'DEL_PICTURE', status: 'success', msg:res.msg, deleted: res.deleted });    
  },
};

export default PictureActions;