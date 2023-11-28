import { Button, Form } from 'antd';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormDropdown, FormInput, FormSwitch } from '../../../../../core/components';

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
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      fullName: '',
      phone: '',
      isAdmin: false,
      isBlock: false,
      gender: 'Nam',
    },
  });

  const handleUpdateUser = (formData) => {
    console.log(formData);
  };

  useEffect(() => {
    reset({
      email: user ? user.email : '',
      password: '',
      passwordConfirm: '',
      fullName: user ? user.fullName : '',
      phone: user ? user.phone : '',
      isAdmin: user ? user.isAdmin : false,
      isBlock: user ? user.isBlock : false,
      gender: user ? user.gender : 'Nam',
    });
  }, [user]);

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
          <FormDropdown
            label='Phái'
            name='gender'
            error={errors.gender}
            control={control}
            dropdownOptions={genderOptions}
            isDisabled={true}
          />
          <div className='row'>
            <div className='col-md-6 col-xs-12'>
              <FormInput
                isPassword
                label='Mật khẩu'
                name='password'
                control={control}
                error={errors.password}
                placeholder='Nhập mật khẩu'
                rules={{
                  minLength: {
                    value: 6,
                    message: 'Mật khẩu phải có ít nhất 6 ký tự',
                  },
                }}
              />
            </div>
            <div className='col-md-6 col-xs-12'>
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
            </div>
          </div>
          <FormDropdown
            label='Vai trò'
            name='isAdmin'
            error={errors.isAdmin}
            control={control}
            dropdownOptions={roleOptions}
          />
          <div className='d-flex'>
            <FormSwitch label='Khoá tài khoản' name='isBlock' control={control} />
            {watch('isBlock') ? (
              <h6 className='text-danger m-0' style={{ alignSelf: 'center' }}>
                Tài khoản đã bị khoá, người dùng này sẽ không thể đăng nhập
              </h6>
            ) : null}
          </div>
          <div className='form-group'>
            <div className='row'>
              <div className='col-md-6 col-xs-12'>
                <Button htmlType='submit' type='primary' size='large' className='w-100'>
                  Lưu thay đổi
                </Button>
              </div>
              <div className='col-md-6 col-xs-12'>
                <Button htmlType='button' type='primary' size='large' className='w-100' danger>
                  Xoá người dùng
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default UpdateUser;
