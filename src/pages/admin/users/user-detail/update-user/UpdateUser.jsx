import { Button, Form } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormDropdown, FormInput } from '../../../../../core/components';

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

const UpdateUser = ({ user }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      email: user ? user.email : '',
      password: '',
      passwordConfirm: '',
      fullName: user ? user.fullName : '',
      phone: user ? user.phone : '',
      isAdmin: user ? user.isAdmin : false,
      isBlock: user ? user.isBlock : false,
      gender: user ? user.gender : 'Nam',
    },
  });

  const handleUpdateUser = (formData) => {
    console.log(formData);
  };

  return (
    <>
      <div className='container'>
        <Form
          name='create-user-form'
          layout='vertical'
          autoComplete='false'
          onFinish={handleSubmit(handleUpdateUser)}>
          <FormInput
            label='Email'
            name='email'
            control={control}
            error={errors.email}
            placeholder='Nhập địa chỉ email'
            isDisabled={true}
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
            isDisabled={true}
          />
          <FormInput
            label='Số điện thoại'
            name='phone'
            control={control}
            error={errors.phone}
            placeholder='Nhập số điện thoại'
            isDisabled={true}
          />
          <div className='row'>
            <div className='col-md-6 col-xs-12'>
              <FormDropdown
                label='Phái'
                name='gender'
                error={errors.gender}
                control={control}
                dropdownOptions={genderOptions}
                isDisabled={true}
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
              Lưu thay đổi
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default UpdateUser;
