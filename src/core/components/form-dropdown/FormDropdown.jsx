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
  isDisabled,
  isMultiple = false,
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
              mode={isMultiple ? 'multiple' : undefined}
              placeholder={placeholder}
              options={dropdownOptions}
              showSearch={hasSearch}
              size='large'
              disabled={isDisabled}
              allowClear={true}
              maxTagCount={2}
            />
          )}
        />
      </Form.Item>
    </>
  );
};

export default memo(FormDropdown);
