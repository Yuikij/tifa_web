import request from '@/utils/request';
import router from 'umi/router';


// const server_name = '/';
const server_name = 'http://localhost:8081';

function token() {
  return window.localStorage.getItem('token');
}
function post(url,data) {
  return request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token(),
    },
    body: JSON.stringify(data),
  });
}

function get(url,data) {
  return request(url, {
    method: 'GET',
    headers: {
      'token': token(),
    },
    body: JSON.stringify(data),
  });
}

export function login(data) {
  return post(server_name + '/login',data);
  // return request(server_name + '/login', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(data),
  // });
}

export function register(data) {
  return post(server_name + '/register',data);
}

export function setCheckCode(email) {
  return post(server_name+'/setCheckCode',{email});
}



