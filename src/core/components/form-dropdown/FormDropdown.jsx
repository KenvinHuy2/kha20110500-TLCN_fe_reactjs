import { Form, Select } from 'antd';
import React, { memo } from 'react';
import { Controller } from 'react-hook-form';

const FormDropdown = ({
  label,
  error,
  name,
  control,
  rules,
  placeholder,
  dropdownOptions,
  hasSearch,
}) => {
  return (
    <>
      <Form.Item label={label} validateStatus={error ? 'error' : ''} help={error && error.message}>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <Select
              {...field}
              placeholder={placeholder}
              options={dropdownOptions}
              showSearch={hasSearch}
              size='large'
            />
          )}
        />
      </Form.Item>
    </>
  );
};

export default memo(FormDropdown);
