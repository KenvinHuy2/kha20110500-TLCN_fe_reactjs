import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Form } from 'antd';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormDropdown, FormInput, FormSwitch } from '../../../../../core/components';
import { AlertService, UsersService } from '../../../../../core/services';
import { storeActions } from '../../../../../core/store';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdateUser = async (formData) => {
    try {
      const payload = {
        password: formData.password && formData.passwordConfirm ? formData.password : undefined,
        isAdmin: formData.isAdmin,
        isBlock: formData.isBlock,
      };
      dispatch(storeActions.showLoading());
      await UsersService.updateUser(user._id, payload);
      AlertService.success('Cập nhật thành công');
      navigate('/admin/quan-ly-nguoi-dung/danh-sach-nguoi-dung');
    } catch (error) {
      AlertService.error(error?.response?.data?.message || error.message);
    } finally {
      dispatch(storeActions.hideLoading());
    }
  };

  const execDeleteUser = async () => {
    try {
      dispatch(storeActions.showLoading());
      await UsersService.deleteUser(user._id);
      AlertService.success('Xoá người dùng thành công');
      navigate('/admin/quan-ly-nguoi-dung/danh-sach-nguoi-dung');
    } catch (error) {
      AlertService.error(error?.response?.data?.message || error.message);
    } finally {
      dispatch(storeActions.hideLoading());
    }
  };

  const handleDeleteUser = () => {
    AlertService.confirm('Bạn có chắc là muốn xoá người dùng này?').then(({ isConfirmed }) => {
      if (isConfirmed) {
        execDeleteUser();
      }
    });
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
        <div className='text-center py-2'>
          <Avatar src={user?.avatar} size={120} icon={<UserOutlined />} />
        </div>
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
            label='Giới tính'
            name='gender'
            error={errors.gender}
            control={control}
            dropdownOptions={genderOptions}
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
                <Button
                  htmlType='button'
                  type='primary'
                  size='large'
                  className='w-100'
                  danger
                  onClick={handleDeleteUser}>
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
