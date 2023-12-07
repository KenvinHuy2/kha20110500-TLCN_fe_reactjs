import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Upload } from 'antd';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { FormDropdown, FormInput } from '../../core/components';
import { AlertService, UsersService } from '../../core/services';
import { storeActions, storeSelectors } from '../../core/store';

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
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const currentUser = useSelector(storeSelectors.selectCurrentUser);
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
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

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      AlertService.warn('Chi cho phép upload hình ảnh');
    }
    return false;
  };

  const revokeUrl = () => {
    if (avatarUrl) {
      console.log('run revoke');
      URL.revokeObjectURL(avatarUrl);
    }
    setAvatarUrl(null);
  };

  const handleUploadFile = ({ file }) => {
    revokeUrl();
    const imageUrl = URL.createObjectURL(file);
    setAvatar(file);
    setAvatarUrl(imageUrl);
  };

  const handleUpdateUser = async (formValue) => {
    try {
      const formData = new FormData();
      ['email', 'passwordConfirm'].forEach((field) => {
        delete formValue[field];
      });
      for (const field of Object.keys(formValue)) {
        if (formValue[field]) {
          formData.append(field, formValue[field]);
        }
      }
      if (avatar) {
        formData.append('avatar', avatar);
      }
      dispatch(storeActions.showLoading());
      const user = await UsersService.updateUser(currentUser._id, formData);
      dispatch(storeActions.setCurrentUser(user));
      localStorage.setItem('currentUser', JSON.stringify(user));
      if (avatar) {
        revokeUrl();
      }
      AlertService.success('Cập nhật thành công');
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
          <h3 className='text-center page-title'>THÔNG TIN CÁ NHÂN</h3>
        </div>
        <div className='py-3 center-box'>
          <img src='/assets/images/divider.png' alt='divider' />
        </div>
        <div className='text-center py-2'>
          <Avatar src={avatarUrl || currentUser?.avatar} size={120} icon={<UserOutlined />} />
          <div className='pt-3'>
            <Upload
              name='avatar'
              onRemove={revokeUrl}
              beforeUpload={beforeUpload}
              onChange={handleUploadFile}
              showUploadList={false}>
              <Button size='large' icon={<UploadOutlined />}>
                Tải ảnh lên
              </Button>
            </Upload>
          </div>
        </div>
        <Form name='my-profile-form' layout='vertical' onFinish={handleSubmit(handleUpdateUser)}>
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
              <FormDropdown
                label='Giới tính'
                name='gender'
                error={errors.gender}
                control={control}
                dropdownOptions={genderOptions}
              />
            </div>
            <div className='col-md-6 col-xs-12'>
              <FormInput
                label='Số điện thoại'
                name='phone'
                control={control}
                error={errors.phone}
                placeholder='Nhập số điện thoại'
                rules={{
                  pattern: {
                    value: /^(\+84|0)(3|5|7|8|9)(\d{8})$/,
                    message: 'Số điện thoại không hợp lệ',
                  },
                }}
              />
            </div>
          </div>
          <FormInput
            label='Địa chỉ'
            placeholder='Nhập địa chỉ'
            name='address'
            control={control}
            error={errors.address}
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
