import request from '@/utils/request';



// const server_name = '/';
const server_name = 'http://192.168.1.96:9080/web_pro/';

export function login(data) {
  return request(server_name + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export function register({ payload: { values } }) {
  return request(server_name + '/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });
}


