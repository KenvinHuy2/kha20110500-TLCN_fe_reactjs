import { KeyOutlined, LoginOutlined, PlusOutlined, SendOutlined } from '@ant-design/icons';
import { Alert, Button, Form } from 'antd';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { FormInput, FormModal } from '../../core/components';
import { AlertService, AuthService } from '../../core/services';
import { storeActions } from '../../core/store';
import ResetPassword from './reset-password/ResetPassword';
import './styles.scss';

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [forgotEmail, setForgotEmail] = useState(null);
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
      dispatch(storeActions.getCartByUserId(userDetail._id));
      localStorage.setItem('currentUser', JSON.stringify(userDetail));
      localStorage.setItem('accessToken', JSON.stringify(userDetail.accessToken));
      const path = userDetail.isAdmin ? '/admin' : '/';
      return navigate(path);
    } catch (error) {
      AlertService.error(error?.response?.data?.message || error.message);
    } finally {
      dispatch(storeActions.hideLoading());
    }
  };

  const handleForgotPassword = async () => {
    try {
      const { value: email } = await AlertService.alertWithEmailInput();
      if (!email) {
        return;
      }
      dispatch(storeActions.showLoading());
      await AuthService.forgotPassword(email);
      setForgotEmail(email);
      setIsOpen(true);
    } catch (error) {
      AlertService.error(error?.response?.data?.message || error.message);
    } finally {
      dispatch(storeActions.hideLoading());
    }
  };

  const cancelForgotPassword = () => {
    setIsOpen(false);
    setForgotEmail(null);
  };

  const handleResendOtp = async () => {
    try {
      dispatch(storeActions.showLoading());
      setIsVisible(false);
      await AuthService.resendOtp(forgotEmail);
      setIsVisible(true);
    } catch (error) {
      AlertService.error(error?.response?.data?.message || error.message);
    } finally {
      dispatch(storeActions.hideLoading());
    }
  };

  const handleFinishForgotPassword = () => {
    setIsOpen(false);
    setForgotEmail(null);
    AlertService.success(
      'Khôi phục mật khẩu thành công. Mật khẩu mới đã được chúng tôi gửi tới email của bạn.',
    );
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
                <Button type='text' icon={<KeyOutlined />} onClick={handleForgotPassword}>
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
      <FormModal
        isOpen={isOpen}
        cancelBtnText='Huỷ'
        title='Khôi phục mật khẩu'
        isUseDefaultFooter={false}
        onCancel={cancelForgotPassword}>
        {isVisible && (
          <div className='pb-3'>
            <Alert
              message='Chúng tôi đã gửi một mã OTP đến email đã của bạn'
              type='success'
              showIcon
              closable
              afterClose={() => setIsVisible(false)}
            />
          </div>
        )}
        <div className='pb-3 text-center'>
          <Button icon={<SendOutlined />} onClick={handleResendOtp}>
            Gửi lai OTP
          </Button>
        </div>
        <ResetPassword
          forgotEmail={forgotEmail}
          onFinish={handleFinishForgotPassword}
          onCancel={cancelForgotPassword}
        />
      </FormModal>
    </>
  );
};

export default Login;
