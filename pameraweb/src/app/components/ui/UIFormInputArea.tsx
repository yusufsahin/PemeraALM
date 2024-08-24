import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { Input, Form } from 'antd';

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
  input: {
    borderRadius: 4,
  },
  formItem: {
    marginBottom: 24,
  },
};

interface FormFieldProps {
  name: string;
  control: Control<any>;
  errors?: any;
  label: string;
  placeholder: string;
  rows?: number;
}

const UIFormInputArea: React.FC<FormFieldProps> = ({
  name,
  control,
  errors,
  label,
  placeholder,
  rows = 4,
}) => (
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
        <Input.TextArea {...field} rows={rows} placeholder={placeholder} style={styles.input} />
      </Form.Item>
    )}
  />
);

export default UIFormInputArea;
