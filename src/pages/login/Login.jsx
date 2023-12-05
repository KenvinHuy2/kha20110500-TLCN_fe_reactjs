import { KeyOutlined, LoginOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { FormInput } from '../../core/components';
import './styles.scss';
import { AlertService, AuthService } from '../../core/services';
import { useDispatch } from 'react-redux';
import { storeActions } from '../../core/store';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = async (formValue) => {
    try {
      dispatch(storeActions.showLoading());
      const userDetail = await AuthService.login(formValue);
      dispatch(storeActions.setCurrentUser(userDetail));
      localStorage.setItem('currentUser', JSON.stringify(userDetail));
      const path = userDetail.isAdmin ? '/admin' : '/';
      return navigate(path);
    } catch (error) {
      AlertService.error(errors?.response?.data?.message || error.message);
    } finally {
      dispatch(storeActions.hideLoading());
    }
  };

  return (
    <>
      <div className='container'>
        <div className='pt-4'>
          <h1 className='text-center page-title'>ĐĂNG NHẬP</h1>
        </div>
        <div className='d-flex justify-content-center align-items-center pb-3'>
          <img src='/assets/images/divider.png' alt='Coffee divider' />
        </div>
        <div className='d-flex justify-content-center align-items center py-3 form-container'>
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
              isPassword
              label='Mật khẩu'
              name='password'
              placeholder='Nhập mật khẩu'
              control={control}
              error={errors.password}
            />
            <div className='form-group'>
              <div className='d-flex align-items-center justify-content-between'>
                <Button type='text' icon={<KeyOutlined />}>
                  Quên mật khẩu?
                </Button>
                <NavLink to='/dang-ky'>
                  <Button type='text' icon={<PlusOutlined />} style={{ color: '#0c713d' }}>
                    Đăng ký tài khoản
                  </Button>
                </NavLink>
              </div>
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
