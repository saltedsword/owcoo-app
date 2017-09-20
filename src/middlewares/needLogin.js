import FetchUtil from '../utils/fetch';
import CONFIG from '../config';
import { browserHistory } from 'react-router';
import { MessageBox } from 'element-react';
import 'element-theme-default';

export default class NeedLogin {
  static async enter(nextState, replace, next) {

    const logInfo = await FetchUtil.fetchData(`${CONFIG.BASE_URL}user/logInfo`);
    if (logInfo.code !== 200 || !logInfo.data.login) {
      localStorage.removeItem('user');
      localStorage.removeItem('menusTree');
      replace('/admin/login');
    }

    next();
  }

  static async leave(preState) {
    
    const logInfo = await FetchUtil.fetchData(`${CONFIG.BASE_URL}user/logInfo`);
    if (logInfo.code !== 200 || !logInfo.data.login) {
      if (!localStorage.getItem('user')) 
        return;
      localStorage.removeItem('user');
      localStorage.removeItem('menusTree');

      await MessageBox.msgbox({
        title: '提示',
        type: 'warning',
        message: '您的登录已超时?',
        showCancelButton: false,
        confirmButtonText: '重新登录',
      });
        
      browserHistory.push('/admin/login');
    }
  }
}
