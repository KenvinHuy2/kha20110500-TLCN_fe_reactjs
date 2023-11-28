import { DatePicker, Form } from 'antd';
import React, { memo } from 'react';
import { Controller } from 'react-hook-form';

const FormDatePicker = ({ label, error, name, control, rules, placeholder, isDisabled }) => {
  return (
    <>
      <Form.Item label={label} validateStatus={error ? 'error' : ''} help={error && error.message}>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <DatePicker
              {...field}
              placeholder={placeholder}
              format='MM/DD/YYYY'
              className='w-100'
              size='large'
              disabled={isDisabled}
            />
          )}
        />
      </Form.Item>
    </>
  );
};

export default memo(FormDatePicker);
