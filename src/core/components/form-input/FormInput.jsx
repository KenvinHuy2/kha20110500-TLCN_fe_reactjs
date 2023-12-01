import { Form, Input } from 'antd';
import React from 'react';
import { Controller } from 'react-hook-form';

const FormInput = ({
  label,
  error,
  control,
  name,
  placeholder,
  rules,
  isPassword,
  isDisabled,
  isReadOnly,
}) => {
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
                readOnly={isReadOnly}
              />
            ) : (
              <Input
                placeholder={placeholder}
                {...field}
                size='large'
                disabled={isDisabled}
                readOnly={isReadOnly}
              />
            )
          }
        />
      </Form.Item>
    </>
  );
};

export default FormInput;
