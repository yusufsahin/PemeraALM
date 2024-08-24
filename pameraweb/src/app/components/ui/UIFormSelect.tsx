import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { Form, Select } from 'antd';

const styles = {
  label: {
    fontWeight: 'bold',
    display: 'block',
    marginBottom: 8,
  },
  error: {
    color: 'red',
    marginTop: 4,
    display: 'block',
  },
  formItem: {
    marginBottom: 24,
  },
};

interface OptionType {
  label: string;
  value: string | number;
}

interface FormFieldProps {
  name: string;
  control: Control<any>;
  errors?: any;
  label: string;
  options: OptionType[];
}

const UIFormSelect: React.FC<FormFieldProps> = ({
  name,
  control,
  errors,
  label,
  options,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Form.Item
          label={<span style={styles.label}>{label}</span>}
          validateStatus={errors[name] ? 'error' : ''}
          help={errors[name] ? <span style={styles.error}>{errors[name].message}</span> : null}
          style={styles.formItem}
        >
          <Select {...field}>
            {options.map((option, index) => (
              <Select.Option key={index} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )}
    />
  );
};

export default UIFormSelect;
