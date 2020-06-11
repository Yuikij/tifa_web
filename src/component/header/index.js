import React, { useState } from 'react';
import { Button } from 'antd';
import router from 'umi/router';
export function Header() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);

  // function handleStatusChange(status) {
  //   setIsOnline(status.isOnline);
  // }

  const onClick= ()=>{
    router.push("/login")
  };

  return (
    <div>
      <Button type="link" onClick={onClick}>登录</Button>
    </div>
  );
}
