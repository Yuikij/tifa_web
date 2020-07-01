import fetch from 'dva/fetch';
import router from 'umi/router';
import { message } from 'antd';

window.access = true;

function parseJSON(response) {
  let json = null;
  return response.text().then(res => {
      try {
        json = JSON.parse(res);
      } catch (e) {
        return res;
      }
      return json;
    },
  );
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    if (!window.access) window.access = true;
    return response;
  }

  if (response.status === 401) {
    if (!window.access) return;
    window.access = false;
    console.log(response);
    message.error('身份认证信息失败，请重新登录');
    return setTimeout(function() {
      window.localStorage.removeItem('user_info');
      window.localStorage.removeItem('login_time');
      window.localStorage.removeItem('token');
      router.push('/');
    }, 1000);
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(url, options)
    // .then(checkStatus)
    // .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}
