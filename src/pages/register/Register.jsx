import { Button, Form } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormDropdown, FormInput } from '../../core/components';
import { AlertService, AuthService } from '../../core/services';
import { storeActions } from '../../core/store';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      fullName: '',
      gender: null,
      phone: '',
      address: '',
    },
  });

  const handleRegister = async (formValue) => {
    try {
      dispatch(storeActions.showLoading());
      delete formValue.passwordConfirm;
      const userDetail = await AuthService.register(formValue);
      dispatch(storeActions.setCurrentUser(userDetail));
      localStorage.setItem('currentUser', JSON.stringify(userDetail));
      localStorage.setItem('accessToken', userDetail.accessToken);
      AlertService.success('Đăng ký tài khoản thành công');
      return navigate('/');
    } catch (error) {
      AlertService.error(error?.response?.data?.message || error.message);
    } finally {
      dispatch(storeActions.hideLoading());
    }
  };

  return (
    <>
      <div className='container'>
        <div className='pt-4'>
          <h1 className='text-center page-title'>ĐĂNG KÝ TÀI KHOẢN</h1>
        </div>
        <div className='d-flex justify-content-center align-items-center pb-3'>
          <img src='/assets/images/divider.png' alt='Coffee divider' />
        </div>
        <div className='d-flex justify-content-center align-items center py-3'>
          <Form
            name='register-form'
            layout='vertical'
            autoComplete='false'
            className='w-50'
            onFinish={handleSubmit(handleRegister)}>
            <FormInput
              label='Email'
              name='email'
              placeholder='Nhập email'
              control={control}
              error={errors.email}
              rules={{
                required: 'Email không được để trống',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Email không hợp lệ',
                },
              }}
            />
            <FormInput
              isPassword
              label='Mật khẩu'
              name='password'
              placeholder='Nhập mật khẩu'
              control={control}
              error={errors.password}
              rules={{
                required: 'Mật khẩu không được để trống',
                minLength: {
                  value: 6,
                  message: 'Mật khẩu phải có ít nhất 6 ký tự',
                },
              }}
            />
            <FormInput
              isPassword
              label='Xác nhận mật khẩu'
              name='passwordConfirm'
              placeholder='Nhập lại mật khẩu'
              control={control}
              error={errors.passwordConfirm}
              rules={{
                required: 'Vui lòng xác nhận lại mật khẩu đã nhập',
                validate: (value) => {
                  if (value !== watch('password')) {
                    return 'Mật khẩu xác nhận không khớp';
                  }
                  return null;
                },
              }}
            />
            <FormInput
              label='Họ và Tên'
              name='fullName'
              placeholder='Nhập Họ và Tên'
              control={control}
              error={errors.fullName}
              rules={{
                required: 'Tên người dùng không được để trống',
              }}
            />
            <div className='row'>
              <div className='col-md-6 col-xs-12'>
                <FormDropdown
                  label='Giới tính'
                  name='gender'
                  control={control}
                  error={errors.gender}
                  placeholder='Chọn giới tính'
                  dropdownOptions={[
                    { value: 'Nam', label: 'Nam' },
                    { value: 'Nữ', label: 'Nữ' },
                    { value: 'Khác', label: 'Khác' },
                  ]}
                  rules={{
                    required: 'Vui lòng chọn giới tính',
                  }}
                />
              </div>
              <div className='col-md-6 col-xs-12'>
                <FormInput
                  label='Số điện thoại'
                  name='phone'
                  placeholder='Nhập số điện thoại'
                  control={control}
                  error={errors.phone}
                  rules={{
                    required: 'Số điện thoại không được để trống',
                    pattern: {
                      value: /^(\+84|0)(3|5|7|8|9)(\d{8})$/,
                      message: 'Số điện thoại không hợp lệ',
                    },
                  }}
                />
              </div>
            </div>
            <FormInput
              label='Địa chỉ (không bắt buộc)'
              name='address'
              placeholder='Nhập địa chỉ'
              control={control}
              error={errors.address}
            />
            <div className='form-group'>
              <Button type='primary' htmlType='submit' size='large' className='w-100'>
                Đăng ký
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
