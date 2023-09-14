import React, { useMemo } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Form, Input, message } from 'antd';

import { useUserInfo } from 'hooks/user-info';
import './index.scss';
import { saltMD5 } from 'utils/crypto';
import { queryDupuser } from 'apis/index';
import { useForm } from 'antd/es/form/Form';

const Login = (): JSX.Element => {
  const { onLogin } = useUserInfo();

  const initialValues = { username: '', password: '', confirm_password: '', is_registe: false };
  const [userform] = useForm();
  const isOpen = useMemo(() => userform.getFieldValue('is_registe'), [userform]);

  const onFinish = async ({ password, username, is_registe }: Iobject) => {
    onLogin({ username, is_registe, password: saltMD5(password) });
  };

  const onChangeUserName = async (e: Iobject) => {
    if (!isOpen) return;

    const res: Iobject = await queryDupuser({ username: e.target.value });
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
          name='control-hooks'
          className='login-form'
          form={userform}
          initialValues={initialValues}
          onFinish={onFinish}
        >
          <Form.Item name='username' rules={[{ required: true, message: '请输入账户名' }]}>
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='请输入账户名'
              onBlur={onChangeUserName}
            />
          </Form.Item>
          <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='请输入密码'
              allowClear
            />
          </Form.Item>
          {isOpen && (
            <Form.Item name='confirm_password' rules={[{ required: true, message: '请确认密码' }]}>
              <Input
                prefix={<LockOutlined className='site-form-item-icon' />}
                type='password'
                placeholder='请确认密码'
                allowClear
              />
            </Form.Item>
          )}
          <Form.Item>
            <Form.Item name='is_registe' valuePropName='checked' noStyle>
              <Checkbox>是否注册并同时登录?</Checkbox>
            </Form.Item>
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
