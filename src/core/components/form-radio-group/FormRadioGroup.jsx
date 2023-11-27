import { Form, Radio } from 'antd';
import React, { memo } from 'react';
import { Controller } from 'react-hook-form';

const FormRadioGroup = ({ label, error, name, control, rules, radioOptions = [] }) => {
  return (
    <>
      <Form.Item label={label} validateStatus={error ? 'error' : ''} help={error && error.message}>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <Radio.Group {...field} size='large'>
              {radioOptions.map((opt, idx) => (
                <Radio key={`${name}-option-${idx}`} value={opt.value}>
                  {opt.label}
                </Radio>
              ))}
            </Radio.Group>
          )}
        />
      </Form.Item>
    </>
  );
};

export default memo(FormRadioGroup);
