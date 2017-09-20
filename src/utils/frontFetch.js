import 'whatwg-fetch';// 创建一个全局对象 window.fetch

export default class FetchUtil {

  static async fetchData(url) {
    let res = await fetch(url, {
      mode: 'cors',
      // credentials: 'include'
    });

    return await res.json();
  }

}