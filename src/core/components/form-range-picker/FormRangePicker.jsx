import { DatePicker, Form } from 'antd';
import React from 'react';
import { Controller } from 'react-hook-form';

const { RangePicker } = DatePicker;
 
const FormRangePicker = ({ label, error, name, control, rules, placeholder, isDisabled }) => {
  return (
    <>
      <Form.Item label={label} validateStatus={error ? 'error' : ''} help={error && error.message}>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <RangePicker
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

export default FormRangePicker;
