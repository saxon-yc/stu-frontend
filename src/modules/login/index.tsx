import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Form, Input, message } from 'antd';

import { useUserInfo } from 'hooks/user-info';
import './index.scss';
import { saltMD5 } from 'utils/crypto';
import { queryDupuser } from 'apis/index';

const Login = (): JSX.Element => {
  const { onLogin } = useUserInfo();

  const onFinish = async ({ password, account, is_create_account }: Iobject) => {
    onLogin({ account, is_create_account, password: saltMD5(password) });
  };

  const onChangeAccount = async (e: Iobject) => {
    const res: Iobject = await queryDupuser({ account: e.target.value });
    if (res.code !== 0) {
      message.warning(res.msg);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <Card
        bordered={false}
        style={{
          width: '400px',
          margin: 'auto',
          borderRadius: '10px',
          boxShadow:
            '0 4px 8px -4px rgba(0,0,0,.13), 0 6px 16px 0 rgba(0,0,0,.08), 0 12px 24px 16px rgba(0,0,0,.04)',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            marginBottom: '24px',
            fontSize: '20px',
            fontWeight: 'bold',
          }}
        >
          「班级管理系统」
        </div>
        <Form
          name='normal_login'
          className='login-form'
          initialValues={{ is_create_account: false }}
          onFinish={onFinish}
        >
          <Form.Item name='account' rules={[{ required: true, message: '请输入账户名' }]}>
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='请输入账户名'
              onBlur={onChangeAccount}
            />
          </Form.Item>
          <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='请输入密码'
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name='is_create_account' valuePropName='checked' noStyle>
              <Checkbox>是否登录并注册账号?</Checkbox>
            </Form.Item>

            <a className='login-form-forgot' href=''>
              忘记密码
            </a>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
