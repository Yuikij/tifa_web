import request from '@/utils/request';



// const server_name = '/';
const server_name = 'http://localhost:8081';

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


