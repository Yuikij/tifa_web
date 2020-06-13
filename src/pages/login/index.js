import React, { useState,useEffect  } from 'react';
import { Button,Icon ,Form,Input,Checkbox} from 'antd';
import styles from './index.less';
import { Link } from 'umi';
import { login } from '@/service/login';
function Login() {
  let reg = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\x20-\x7e]{6,12}$/);

  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = isLogin?"登录":"注册";
  });

  const onSubmit = (values) =>{
    login(values).then((e)=>{
      window.localStorage.setItem('frequent-contacts', JSON.stringify(e));
    })
  };

  return <div className={styles.main}>
    <div style={{width:"20%"}}>

      {
        isLogin?<Form onFinish={onSubmit}>
          <Form.Item name={"username"}  rules={[{ required: true, message: '请输入账号' }]}>
            <Input  prefix={<Icon type="user"/>} placeholder="账号"/>,
          </Form.Item>
          <Form.Item name={"password"}  rules={[{ required: true, message: '请输入密码' }]}>
            <Input prefix={<Icon type="lock"/>} type="password"
                   placeholder="密码"/>,
          </Form.Item>
          <div>
            <Checkbox>
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
          <Link className={styles.register} onClick={()=>{setIsLogin(false)}}>
            注册账户
          </Link>
          {/*<div style={{ background: '#ECECEC', padding: '30px' }}>*/}
          {/*<Card title="Card title" bordered={false} style={{ width: 300 }}>*/}
          {/*<p>Card content</p>*/}
          {/*<p>Card content</p>*/}
          {/*<p>Card content</p>*/}
          {/*</Card>*/}
          {/*</div>*/}
        </Form>:
          <Form onFinish={onSubmit}>
            <Form.Item name={"username"}  rules={[{ required: true, message: '请输入账号' }]}>
              <Input  prefix={<Icon type="user"/>} placeholder="账号"/>,
            </Form.Item>
            <Form.Item name={"password"}  rules={[{ required: true, message: '请输入密码' }]}>
              <Input prefix={<Icon type="lock"/>} type="password"
                     placeholder="密码"/>,
            </Form.Item>
            <Form.Item name={"password"}  rules={[{ required: true, message: '请输入密码' }]}>
              <Input prefix={<Icon type="lock"/>} type="password"
                     placeholder="密码"/>,
            </Form.Item>
            <Button htmlType="submit" block>
              完成
            </Button>
          </Form>
      }
    </div>
  </div>
}
// const NormalLoginForm = Form.create({ name: 'normal-login' })(Login);
export default Login;
