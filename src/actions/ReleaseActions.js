import FetchUtil from '../utils/fetch';
import CONFIG from '../config';

const UserActions = {

  releaseInit: () => async (dispatch, getState) => {
    dispatch({ type: 'RELEASE_INIT', status: 'loading' });
    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}release/init`)
    if (res === false) return;
    if (res.code !== 200) return dispatch({ type: 'RELEASE_INIT', status: 'error', msg: res.msg });
    dispatch({ type: 'RELEASE_INIT', status: 'success', msg:res.msg, data: res.data });    
  },

  getReleaseUrl: (payload) => async (dispatch, getState) => {
    dispatch({ type: 'GET_RELEASE_URL', status: 'loading' });

    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}release/getReleaseUrl?id=${payload}`);
    if (res === false) return;
    if (res.code !== 200) return dispatch({ type: 'GET_RELEASE_URL', status: 'error', msg: res.msg });
    dispatch({ type: 'GET_RELEASE_URL', status: 'success', msg:res.msg, pushUrl: res.data.pushUrl });  
  },

};

export default UserActions;