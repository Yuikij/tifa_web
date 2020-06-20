import React, { useState, useEffect } from 'react';
import { Button, message, Form, Input, Checkbox } from 'antd';
import styles from './index.less';
import { Link } from 'umi';
import { login } from '@/service/login';
import router from 'umi/router';
import { UserOutlined, LockOutlined } from '@ant-design/icons/es/icons';

function Login() {
  const reg = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\x20-\x7e]{6,12}$/);
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },}

  const [isLogin, setIsLogin] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = isLogin ? '登录' : '注册';
  });

  const onSubmit = (values) => {
    values.rememberMe = rememberMe;
    login(values).then((e) => {
      if (e.data && e.data.success) {
        window.localStorage.setItem('token', JSON.stringify(e.data.token));
        router.push('/');
        message.success(e.data.msg || '登录成功');
      }
    });
  };

  return <div className={styles.main}>
    <div style={{ width: '20%' }}>

      {
        isLogin ? <Form onFinish={onSubmit}>
            <Form.Item name={'username'} rules={[{ required: true, message: '请输入账号' }]}>
              <Input prefix={<UserOutlined/>} placeholder="账号"/>
            </Form.Item>
            <Form.Item name={'password'} rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password prefix={<LockOutlined/>} type="password"
                              placeholder="密码"/>
            </Form.Item>
            <div>
              <Checkbox onChange={(e) => {
                setRememberMe(e.target.checked);
              }}>
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
            <Link className={styles.register} onClick={() => {
              setIsLogin(false);
            }}>
              注册账户
            </Link>
            {/*<div style={{ background: '#ECECEC', padding: '30px' }}>*/}
            {/*<Card title="Card title" bordered={false} style={{ width: 300 }}>*/}
            {/*<p>Card content</p>*/}
            {/*<p>Card content</p>*/}
            {/*<p>Card content</p>*/}
            {/*</Card>*/}
            {/*</div>*/}
          </Form> :
          <Form
            {...formItemLayout}
            onFinish={onSubmit}>
            <Form.Item
              name="email"
              label="邮箱"
              rules={[
                {
                  type: 'email',
                  message: '邮箱格式无效',
                },
                {
                  required: true,
                  message: '请输入邮箱',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="nickname"
              label="昵称"
              rules={[
                {
                  required: true,
                  message: '请输入昵称',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name={'new_username'} label="账号" rules={[{ required: true, message: '请输入账号' }]}>
              <Input prefix={<LockOutlined/>} placeholder="账号"/>
            </Form.Item>
            <Form.Item  hasFeedback name={'new_password'} label="密码" rules={[{ required: true, message: '请输入密码' },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || reg.test(value)) {
                    return Promise.resolve();
                  }

                  return Promise.reject('密码由6-12位数字、大小写字母组成');
                },
              })]}>
              <Input.Password readonly prefix={<LockOutlined/>}
                              placeholder="密码"/>
            </Form.Item>
            <Form.Item
              hasFeedback
              label="确认密码"
              dependencies={['new_username']}
              name={'confirm'} rules={[{ required: true, message: '请输入密码' }
              , ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('new_username') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('两次密码不相同');
                },
              })]}>
              <Input.Password readonly prefix={<LockOutlined/>}
                              placeholder="密码"/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
      }
    </div>
  </div>;
}

export default Login;
