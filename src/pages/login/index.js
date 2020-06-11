import React, { useState } from 'react';
import { Button,Icon ,Form,Input,Checkbox} from 'antd';
import styles from './index.less';
import { Link } from 'umi';
function Login({form}) {
  return <div className={styles.main}>
    <div style={{width:"20%"}}>

      <Form>
        <Form.Item name={"username"}  rules={[{ required: true, message: '请输入账号' }]}>
            <Input  prefix={<Icon type="user"/>} placeholder="账号"/>,
        </Form.Item>
        <Form.Item name={"password"}  rules={[{ required: true, message: '请输入密码' }]}>
            <Input prefix={<Icon type="lock"/>} type="password"
                   placeholder="密码"/>,
        </Form.Item>
        <div>
          <Checkbox  >
            自动登录
          </Checkbox>
          {/*<a*/}
          {/*style={{*/}
          {/*float: 'right',*/}
          {/*}}*/}
          {/*>*/}
          {/*忘记密码*/}
          {/*</a>*/}
        </div>
        <Button htmlType="submit" block>
          登录
        </Button>
        <Link className={styles.register} to="/user/register">
          注册账户
        </Link>
        {/*<div style={{ background: '#ECECEC', padding: '30px' }}>*/}
        {/*<Card title="Card title" bordered={false} style={{ width: 300 }}>*/}
        {/*<p>Card content</p>*/}
        {/*<p>Card content</p>*/}
        {/*<p>Card content</p>*/}
        {/*</Card>*/}
        {/*</div>*/}
      </Form>
    </div>

  </div>
}
// const NormalLoginForm = Form.create({ name: 'normal-login' })(Login);
export default Login;
