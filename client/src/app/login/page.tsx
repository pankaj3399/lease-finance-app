'use client';

import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Input, Typography, message } from 'antd';
import { KeyOutlined, UserOutlined } from '@ant-design/icons';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import CompanyLogo from '@/components/CompanyLogo';

type formValues = {
  username: string;
  password: string;
};

const Login = () => {
  const { status } = useSession();

  const router = useRouter();

  const [messageApi, contextHolder] = message.useMessage();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: formValues) => {
    try {
      setIsLoading(true);
      const res = await signIn('credentials', {
        username: values.username,
        password: values.password,
        redirect: false,
      });

      if (res?.error) {
        messageApi.error(res.error);
      }

      if (res?.ok) {
        return router.replace('/dealer-portal');
      }
    } catch (err) {
      console.log({ err });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dealer-portal');
    }
  }, [status, router]);

  return (
    <div className='flex flex-col w-full items-center justify-center min-h-[100dvh]'>
      {contextHolder}
      <CompanyLogo />
      <Card className='w-full max-w-[450px] space-y-2 mx-2'>
        <Typography.Title level={2} className='text-center'>
          Welcome to lease app
        </Typography.Title>

        <Form name='login-form' onFinish={onSubmit} autoComplete='off'>
          <Form.Item
            name='username'
            rules={[{ required: true, message: 'Username is required' }]}
          >
            <Input
              placeholder='Enter your username'
              size='large'
              prefix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Password is required' }]}
          >
            <Input.Password
              placeholder='Enter your password'
              size='large'
              prefix={<KeyOutlined />}
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 10,
            }}
          >
            <Button
              htmlType='submit'
              size='large'
              type='primary'
              disabled={isLoading}
              loading={isLoading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
