import { Button, Form } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { FormDropdown, FormInput } from '../../../../core/components';
import { AlertService, UsersService } from '../../../../core/services';
import { storeActions } from '../../../../core/store';

const roleOptions = [
  {
    label: 'Quản trị viên',
    value: true,
  },
  {
    label: 'Khách hàng',
    value: false,
  },
];

const genderOptions = [
  {
    label: 'Nam',
    value: 'Nam',
  },
  {
    label: 'Nữ',
    value: 'Nữ',
  },
  {
    label: 'Khác',
    value: 'Khác',
  },
];

const CreateUser = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      fullName: '',
      phone: '',
      isAdmin: false,
      gender: 'Nam',
    },
  });
  const dispatch = useDispatch();

  const handleCreateUser = async (formData) => {
    try {
      delete formData.passwordConfirm;
      dispatch(storeActions.showLoading());
      await UsersService.createUser(formData);
      AlertService.success('Tạo người dùng hành công');
      reset();
    } catch (error) {
      AlertService.error(error?.response?.data?.message || error.message);
    } finally {
      dispatch(storeActions.hideLoading());
    }
  };

  return (
    <>
      <div className='container w-75'>
        <Form name='create-user-form' layout='vertical' onFinish={handleSubmit(handleCreateUser)}>
          <FormInput
            label='Email'
            name='email'
            control={control}
            error={errors.email}
            placeholder='Nhập địa chỉ email'
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
            control={control}
            error={errors.password}
            placeholder='Nhập mật khẩu'
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
            control={control}
            error={errors.passwordConfirm}
            placeholder='Nhập mật khẩu'
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
            label='Họ và tên'
            name='fullName'
            control={control}
            error={errors.fullName}
            placeholder='Nhập tên người dùng'
            rules={{
              required: 'Tên người dùng không được để trống',
            }}
          />
          <FormInput
            label='Số điện thoại'
            name='phone'
            control={control}
            error={errors.phone}
            placeholder='Nhập số điện thoại'
            rules={{
              required: 'Số điện thoại không được để trống',
              pattern: {
                value: /^(\+84|0)(3|5|7|8|9)(\d{8})$/,
                message: 'Số điện thoại không hợp lệ',
              },
            }}
          />
          <div className='row'>
            <div className='col-md-6 col-xs-12'>
              <FormDropdown
                label='Phái'
                name='gender'
                error={errors.gender}
                control={control}
                dropdownOptions={genderOptions}
              />
            </div>
            <div className='col-md-6 col-xs-12'>
              <FormDropdown
                label='Vai trò'
                name='isAdmin'
                error={errors.isAdmin}
                control={control}
                dropdownOptions={roleOptions}
              />
            </div>
          </div>
          <div className='form-group'>
            <Button htmlType='submit' type='primary' size='large' className='w-100'>
              Tạo người dùng
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default CreateUser;
