import React from "react";
import './style.scss';
import LoginImage from "./login.png";
import { MobXProviderContext } from 'mobx-react';
import { Form, Input, Button } from 'antd';

const useStores = () => {
  return React.useContext(MobXProviderContext)
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function Login() {

  const { rootStore: { authStore } } = useStores();

  const onFinish = values => {
    console.log('Success:', values);
    authStore.login(values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="wrap-login-component">
      <img src={LoginImage} alt="test" className="login-image" />
      <Form
        {...layout}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
        </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
