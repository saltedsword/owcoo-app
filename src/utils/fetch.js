import 'whatwg-fetch';// 创建一个全局对象 window.fetch
import { browserHistory } from 'react-router';
import { MessageBox, Notification } from 'element-react';
import 'element-theme-default';

export default class FetchUtil {

  static async fetchData(url) {
    let res = await fetch(url, {
      mode: 'cors',
      // credentials: 'include'
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token') || '',
      },
    });

    const resJson = await res.json();
    if (await FetchUtil.chkAuth(res.status, resJson)) return resJson;
    return false;
  }

  static async postData(url, body, isFileUpload = false) {
    if (!isFileUpload) {
      let res = await fetch(url, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token') || '',
        },
        body: body,
        mode: 'cors',
        // credentials: 'include'
      });
      
      const resJson = await res.json();
      if (await FetchUtil.chkAuth(res.status, resJson)) return resJson;
      return false;
    }

    let formData = new FormData();
    Object.keys(body).forEach((item, index) => {
      if (Array.isArray(body[item])) {
        return body[item].forEach((file) => formData.append(`${item}`, file));
      }
      if (body[item] instanceof Object) {
        return Object.keys(body[item]).forEach((field) => formData.append(`${item}[${field}]`, body[item][field]));
      }
      formData.append(item, body[item]);
    });
    let res = await fetch(url, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
      },
      body: formData,
      mode: 'cors',
      credentials: 'include'
    });
    
    const resJson = await res.json();
    if (await FetchUtil.chkAuth(res.status, resJson)) return resJson;
    return false;
  }

  static async chkAuth(status, {code, msg, needLogin}) {
    if (status !== 401)
      return true;

    if (status === 401 && code === -200 && needLogin) {
      console.log('需要重新登录：' + msg);
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
      return false;
    }

    if (status === 401 && code === -200) {
      Notification.error({
        title: '权限不足',
        message: msg
      });
      return false;
    }
  }

}