import { Button, Form } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormDropdown, FormInput } from '../../core/components';

const Register = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
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

  const handleLogin = async (formValue) => {
    console.log(formValue);
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
            <FormInput
              isPassword
              label='Xác nhận mật khẩu'
              name='password'
              placeholder='Nhập lại mật khẩu'
              control={control}
              error={errors.password}
            />
            <div className='row'>
              <div className='col-md-6 col-xs-12'>
                <FormDropdown
                  label='Giới tính'
                  name='gender'
                  control={control}
                  error={errors.gender}
                  placeholder='Chọn giới tính'
                  dropdownOptions={[]}
                />
              </div>
              <div className='col-md-6 col-xs-12'>
                <FormInput
                  label='Số điện thoại'
                  name='phone'
                  placeholder='Nhập số điện thoại'
                  control={control}
                  error={errors.phone}
                />
              </div>
            </div>
            <FormInput
              label='Địa chỉ'
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
