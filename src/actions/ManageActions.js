import FetchUtil from '../utils/fetch';
import CONFIG from '../config';

const ManageActions = {

  manageList: (payload) => async (dispatch, getState) => {
    const { id='', search='', ctype } = payload ? payload : {};
    dispatch({ type: 'MANAGE_LIST', status: 'loading', data: [] });
    const url = id ? `${CONFIG.BASE_URL}manage/manageInit/${id}${search}`
      : `${CONFIG.BASE_URL}manage/manageInit${search}`;
    const res = await FetchUtil.fetchData(url);
    if (res === false) return;
    if (res.code !== 200) return dispatch({ type: 'MANAGE_LIST', status: 'error', msg: res.msg });
    dispatch({ type: 'MANAGE_LIST', status: 'success', msg:res.msg, data: res.data, ctype });  
  },

};

export default ManageActions;