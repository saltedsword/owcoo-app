import FetchUtil from '../utils/fetch';
import CONFIG from '../config';

const UserGroupActions = {

  saveUserGroup: () => async (dispatch, getState) => {
      dispatch({ type: 'SAVE_USERGROUP', status: 'loading' });

      const userGroup = getState().userGroupList.userGroup;
      const res = await FetchUtil.postData(`${CONFIG.BASE_URL}userGroup/save`, JSON.stringify({userGroup}));
      if (res === false) return;
      if (res.code !== 200) return dispatch({ type: 'SAVE_USERGROUP', status: 'error', msg: res.msg });
      Object.assign(res.data, {dialogVisible1: false, dialogVisible2: false});
      dispatch({ type: 'SAVE_USERGROUP', status: 'success', msg:res.msg, data: res.data });
  },

  userGroupInit: (payload) => async (dispatch, getState) => {
    dispatch({ type: 'USERGROUP_INIT', status: 'loading' });
    const id = payload._id || '';
    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}userGroup/saveInit/${id}`)
    if (res === false) return;
    if (res.code !== 200) return dispatch({ type: 'USERGROUP_INIT', status: 'error', msg: res.msg });
    Object.assign(res.data, {[payload.dialog]: true});
    if (!id) 
      res.data.userGroup = {
        _id: '',
        name: '',
        description: '',
        resources: [],
      };
    dispatch({ type: 'USERGROUP_INIT', status: 'success', msg:res.msg, data: res.data });    
  },

  userGroupList: (payload) => async (dispatch, getState) => {
    dispatch({ type: 'USERGROUP_LIST', status: 'loading' });

    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}userGroup/list?p=${payload || 1}`);
    if (res === false) return;
    if (res.code !== 200) return dispatch({ type: 'USERGROUP_LIST', status: 'error', msg: res.msg });
    dispatch({ type: 'USERGROUP_LIST', status: 'success', msg:res.msg, data: res.data });  
  },

  delUserGroup: (payload) => async (dispatch, getState) => {
    dispatch({ type: 'DEL_USERGROUP', status: 'loading' });

    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}userGroup/del/${payload}`);
    if (res === false) return;
    if (res.code !== 200) return dispatch({ type: 'DEL_USERGROUP', status: 'error', msg: res.msg });
    dispatch({ type: 'DEL_USERGROUP', status: 'success', msg:res.msg, data: res.data });    
  },
};

export default UserGroupActions;