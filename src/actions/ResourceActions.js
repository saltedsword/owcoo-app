import FetchUtil from '../utils/fetch';
import CONFIG from '../config';

const ResourceActions = {

  saveResource: () => async (dispatch, getState) => {
      dispatch({ type: 'SAVE_RESOURCE', status: 'loading' });

      const resource = getState().resourceList.resource;
      const res = await FetchUtil.postData(`${CONFIG.BASE_URL}resource/save`, JSON.stringify({resource}));
      if (res === false) return;
      if (res.code !== 200) return dispatch({ type: 'SAVE_RESOURCE', status: 'error', msg: res.msg });
      Object.assign(res.data, {dialogVisible: false});
      dispatch({ type: 'SAVE_RESOURCE', status: 'success', msg:res.msg, data: res.data });
  },

  resourceInit: (payload) => async (dispatch, getState) => {
    dispatch({ type: 'RESOURCE_INIT', status: 'loading' });
    const id = payload._id || '';
    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}resource/saveInit/${id}`)
    if (res === false) return;
    if (res.code !== 200) return dispatch({ type: 'RESOURCE_INIT', status: 'error', msg: res.msg });
    Object.assign(res.data, {dialogVisible: true});
    if (!id) res.data.resource = {parent: payload.parent};
    dispatch({ type: 'RESOURCE_INIT', status: 'success', msg:res.msg, data: res.data });    
  },

  resourceList: (payload) => async (dispatch, getState) => {
    dispatch({ type: 'RESOURCE_LIST', status: 'loading' });

    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}resource/list`);
    if (res === false) return;
    if (res.code !== 200) return dispatch({ type: 'RESOURCE_LIST', status: 'error', msg: res.msg });
    dispatch({ type: 'RESOURCE_LIST', status: 'success', msg:res.msg, data: res.data });  
  },

  delResource: (payload) => async (dispatch, getState) => {
    dispatch({ type: 'DEL_RESOURCE', status: 'loading' });

    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}resource/del/${payload}`);
    if (res === false) return;
    if (res.code !== 200) return dispatch({ type: 'DEL_RESOURCE', status: 'error', msg: res.msg });
    dispatch({ type: 'DEL_RESOURCE', status: 'success', msg:res.msg, data: res.data });    
  },
};

export default ResourceActions;