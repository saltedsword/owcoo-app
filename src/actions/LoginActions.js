import FetchUtil from '../utils/fetch';
import CONFIG from '../config';

const LoginActions = {

  login: () => async (dispatch, getState) => {
    dispatch({ type: 'LOGIN', status: 'loading' });
    const login = getState().login.login;
    const res = await FetchUtil.postData(`${CONFIG.BASE_URL}user/login`, JSON.stringify({user: login}));
    if (res === false) return;
    if (res.code !== 200) return dispatch({ type: 'LOGIN', status: 'error', msg: res.msg });

    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    localStorage.setItem('menusTree', JSON.stringify(res.data.menusTree));

    dispatch({ type: 'LOGIN', status: 'loginSuccess', msg:res.msg, data: res.data });    
  },
};

export default LoginActions;