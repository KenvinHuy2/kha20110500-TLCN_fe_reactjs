import { Form, Switch } from 'antd';
import React from 'react';
import { Controller } from 'react-hook-form';

const FormSwitch = ({ label, name, control }) => {
  return (
    <>
      <Form.Item label={label}>
        <Controller
          name={name}
          control={control}
          defaultValue={false}
          render={({ field }) => <Switch {...field} checked={field.value} />}
        />
      </Form.Item>
    </>
  );
};

export default FormSwitch;
