import React, { useState } from 'react';
import { Button } from 'antd';
import router from 'umi/router';

export function Header() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);
  const token = window.localStorage.getItem('token');
  const user_info_ = window.localStorage.getItem('user_info');
  const user_info = user_info_ ? JSON.parse(user_info_) : null;

  // function handleStatusChange(status) {
  //   setIsOnline(status.isOnline);
  // }

  const onClick = () => {
    router.push('/login');
    window.localStorage.clear();
  };

  return (
    <div>
      {!user_info ? <Button type="link" onClick={onClick}>登录</Button> : [<span>{user_info.nickname}</span>,
        <Button type="link" onClick={onClick}>退出登录</Button>]}

    </div>
  );
}
