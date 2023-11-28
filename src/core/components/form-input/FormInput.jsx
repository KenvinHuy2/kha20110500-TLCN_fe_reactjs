import { Form, Input } from 'antd';
import React, { memo } from 'react';
import { Controller } from 'react-hook-form';

const FormInput = ({ label, error, control, name, placeholder, rules, isPassword, isDisabled }) => {
  return (
    <>
      <Form.Item label={label} validateStatus={error ? 'error' : ''} help={error && error.message}>
        <Controller
          name={name}
          rules={rules}
          control={control}
          render={({ field }) =>
            isPassword ? (
              <Input.Password
                placeholder={placeholder}
                {...field}
                size='large'
                disabled={isDisabled}
              />
            ) : (
              <Input placeholder={placeholder} {...field} size='large' disabled={isDisabled} />
            )
          }
        />
      </Form.Item>
    </>
  );
};

export default memo(FormInput);
