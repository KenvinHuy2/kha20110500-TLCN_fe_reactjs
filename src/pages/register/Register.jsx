import { Button, Form } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormDropdown, FormInput } from '../../core/components';
import { AlertService, AuthService } from '../../core/services';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate()
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

  const handleRegister = async (formValue) => {
    if (formValue.passwordConfirm != formValue.password) {
      AlertService.error("Mật khẩu nhập lại không trùng khớp!")
    } else {
      const { passwordConfirm, ...payload } = { ...formValue };
      AuthService.register(payload).then(data => {
        AlertService.success("Đăng ký thành công");
        navigate('/')
        localStorage.setItem('user', JSON.stringify(data));
      }).catch(errors => {
        AlertService.error(errors?.response.data.message)
      })
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
              name='passwordConfirm'
              placeholder='Nhập lại mật khẩu'
              control={control}
              error={errors.passwordConfirm}
            />
            <FormInput
              label='Họ và Tên'
              name='fullName'
              placeholder='Nhập Họ và Tên'
              control={control}
              error={errors.fullName}
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
