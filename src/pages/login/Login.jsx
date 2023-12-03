import { KeyOutlined, LoginOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormInput } from '../../core/components';
import './styles.scss';

const Login = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = async (formValue) => {
    console.log(formValue);
  };

  return (
    <>
      <div className='login-banner'>
        <img src='/assets/images/carousel_1.jpeg' alt='Login banner' width='100%' />
      </div>
      <div className='container'>
        <div className='pt-4'>
          <h1 className='text-center page-title'>ĐĂNG NHẬP</h1>
        </div>
        <div className='d-flex justify-content-center align-items-center pb-3'>
          <img src='/assets/images/divider.png' alt='Coffee divider' />
        </div>
        <div className='d-flex justify-content-center align-items center py-3'>
          <Form
            name='login-form'
            layout='vertical'
            autoComplete='false'
            className='w-50'
            onFinish={handleSubmit(handleLogin)}>
            <FormInput
              label='Email'
              name='email'
              placeholder='Nhập email'
              control={control}
              error={errors.email}
            />
            <FormInput
              label='Mật khẩu'
              name='password'
              placeholder='Nhập mật khẩu'
              control={control}
              error={errors.password}
            />
            <div className='form-group text-right'>
              <Button type='text' icon={<KeyOutlined />}>
                Quên mật khẩu?
              </Button>
            </div>
            <div className='form-group'>
              <Button
                type='primary'
                htmlType='submit'
                icon={<LoginOutlined />}
                size='large'
                className='w-100'>
                Đăng nhập
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
