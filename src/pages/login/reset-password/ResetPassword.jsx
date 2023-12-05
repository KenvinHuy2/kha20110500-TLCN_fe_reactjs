import { Button, Form } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { FormInput } from '../../../core/components';
import { AlertService, AuthService } from '../../../core/services';
import { storeActions } from '../../../core/store';

const ResetPassword = ({ onFinish, forgotEmail, onCancel }) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({ defaultValues: { otpCode: '' } });

  const handleVerifyOtp = async (formValue) => {
    try {
      dispatch(storeActions.showLoading());
      const payload = {
        email: forgotEmail,
        otpCode: formValue.otpCode,
      };
      await AuthService.verifyOtp(payload);
      reset();
      onFinish();
    } catch (error) {
      AlertService.error(error?.response?.data?.message || error.message);
    } finally {
      dispatch(storeActions.hideLoading());
    }
  };

  return (
    <>
      <Form
        layout='vertical'
        autoComplete='false'
        name='verify-otp-form'
        onFinish={handleSubmit(handleVerifyOtp)}>
        <FormInput
          name='otpCode'
          placeholder='Nhập mã OTP'
          control={control}
          error={errors.otpCode}
          rules={{ required: 'Mã OTP không được để trống' }}
        />
        <div className='d-flex justify-content-between align-items-center'>
          <Button type='primary' size='large' htmlType='submit'>
            Xác nhận
          </Button>
          <Button size='large' htmlType='button' onClick={onCancel}>
            Huỷ
          </Button>
        </div>
      </Form>
    </>
  );
};

export default ResetPassword;
