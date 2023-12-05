import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Form } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { FormDropdown, FormInput } from '../../core/components';
import { storeActions, storeSelectors } from '../../core/store';
import { AlertService } from '../../core/services';

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

const MyProfile = () => {
  const currentUser = useSelector(storeSelectors.selectCurrentUser);
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      email: currentUser.email || null,
      password: '',
      passwordConfirm: '',
      fullName: currentUser.fullName || null,
      phone: currentUser.phone || null,
      gender: currentUser.gender || null,
      address: currentUser.address || null,
    },
  });
  const dispatch = useDispatch();

  const handleUpdateUser = async (formData) => {
    try {
      console.log(formData);
      dispatch(storeActions.showLoading());
    } catch (error) {
      AlertService.error(error?.response?.data?.message || error.message);
    } finally {
      dispatch(storeActions.hideLoading());
    }
  };

  return (
    <>
      <div className='container'>
        <div className='pt-5'>
          <h3 className='text-center page-title'>THÔNG TIN CÁ NHÂN</h3>
        </div>
        <div className='py-3 center-box'>
          <img src='/assets/images/divider.png' alt='divider' />
        </div>
        <div className='text-center py-2'>
          <Avatar src={currentUser?.avatar} size={120} icon={<UserOutlined />} />
          <div className='pt-3'>
            <Button size='large' icon={<UploadOutlined />}>
              Tải ảnh lên
            </Button>
          </div>
        </div>
        <Form
          name='my-profile-form'
          layout='vertical'
          autoComplete='false'
          onFinish={handleSubmit(handleUpdateUser)}>
          <FormInput
            isDisabled
            label='Email'
            name='email'
            control={control}
            error={errors.email}
            placeholder='Nhập địa chỉ email'
          />
          <FormInput
            label='Họ và tên'
            name='fullName'
            control={control}
            error={errors.fullName}
            placeholder='Nhập tên người dùng'
          />
          <div className='row'>
            <div className='col-md-6 col-xs-12'>
              <FormInput
                label='Số điện thoại'
                name='phone'
                control={control}
                error={errors.phone}
                placeholder='Nhập số điện thoại'
              />
            </div>
            <div className='col-md-6 col-xs-12'>
              <FormDropdown
                label='Giới tính'
                name='gender'
                error={errors.gender}
                control={control}
                dropdownOptions={genderOptions}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6 col-xs-12'>
              {' '}
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
          <div className='form-group pb-4 text-center'>
            <Button htmlType='submit' type='primary' size='large'>
              Lưu thay đổi
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default MyProfile;
