import FetchUtil from '../utils/fetch';
import CONFIG from '../config';

const UserActions = {

  saveUser: () => async (dispatch, getState) => {
      dispatch({ type: 'SAVE_USER', status: 'loading' });

      const user = getState().userList.user;
      const res = await FetchUtil.postData(`${CONFIG.BASE_URL}user/save`, JSON.stringify({user}));
      if (res === false) return;
      if (res.code !== 200) return dispatch({ type: 'SAVE_USER', status: 'error', msg: res.msg });
      Object.assign(res.data, {dialogVisible: false});
      dispatch({ type: 'SAVE_USER', status: 'success', msg:res.msg, data: res.data });
  },

  userInit: (payload) => async (dispatch, getState) => {
    dispatch({ type: 'USER_INIT', status: 'loading' });
    const id = payload._id || '';
    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}user/saveInit/${id}`)
    if (res === false) return;
    if (res.code !== 200) return dispatch({ type: 'USER_INIT', status: 'error', msg: res.msg });
    Object.assign(res.data, {dialogVisible: true});
    if (!id) 
      res.data.user = {
        _id: '',
        userName: '',
        name: '',
        pass: '',
        checkPass: '',
        userGroup: '',
        phone: '',
        email: '',
        remarks: '',
      };
    dispatch({ type: 'USER_INIT', status: 'success', msg:res.msg, data: res.data });    
  },

  userList: (payload) => async (dispatch, getState) => {
    dispatch({ type: 'USER_LIST', status: 'loading' });

    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}user/list?p=${payload || 1}`);
    if (res === false) return;
    if (res.code !== 200) return dispatch({ type: 'USER_LIST', status: 'error', msg: res.msg });
    dispatch({ type: 'USER_LIST', status: 'success', msg:res.msg, data: res.data });  
  },

  delUser: (payload) => async (dispatch, getState) => {
    dispatch({ type: 'DEL_USER', status: 'loading' });

    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}user/del/${payload}`);
    if (res === false) return;
    if (res.code !== 200) return dispatch({ type: 'DEL_USER', status: 'error', msg: res.msg });
    dispatch({ type: 'DEL_USER', status: 'success', msg:res.msg, data: res.data });    
  },
};

export default UserActions;