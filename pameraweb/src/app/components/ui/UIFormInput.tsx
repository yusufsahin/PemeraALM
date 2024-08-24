import React from "react";
import { Control, Controller } from "react-hook-form";
import { Input, Form, Radio } from "antd";

const styles = {
  label: {
    fontWeight: "bold",
    display: "block",
    marginBottom: 8,
  },
  error: {
    color: "red",
    marginTop: 4,
    display: "block",
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
  type?: string;
  options?: Array<{ value: number | string | boolean; label: string }>;
}

const UIFormInput: React.FC<FormFieldProps> = ({
  name,
  control,
  errors,
  options,
  label,
  placeholder,
  type = "text",
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <Form.Item
        label={<span style={styles.label}>{label}</span>}
        validateStatus={errors[name] ? "error" : ""}
        help={
          errors[name] ? (
            <span style={styles.error}>{errors[name].message}</span>
          ) : null
        }
        style={styles.formItem}
      >
        {type === "password" ? (
          <Input.Password
            {...field}
            placeholder={placeholder}
            style={styles.input}
          />
        ) : type === "checkbox" ? (
          <Radio.Group {...field} options={options}></Radio.Group>
        ) : (
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            style={styles.input}
          />
        )}
      </Form.Item>
    )}
  />
);

export default UIFormInput;
