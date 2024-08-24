import React from "react";
import { Control, Controller } from "react-hook-form";
import { AutoComplete, Form, Input } from "antd";

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
  type?: "default" | "user";
  options?: { value: string; label: string }[]; // Typed options for AutoComplete
}

const UIAutoComplete: React.FC<FormFieldProps> = ({
  name,
  control,
  errors,
  label,
  placeholder,
  options = [],
  type = "default",
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <Form.Item
        label={<span style={styles.label}>{label}</span>}
        validateStatus={errors?.[name] ? "error" : ""}
        help={
          errors?.[name] ? (
            <span style={styles.error}>{errors[name].message}</span>
          ) : null
        }
        style={styles.formItem}
      >
        <AutoComplete
          {...field}
          options={options}
          placeholder={placeholder}
          style={styles.input}
          onChange={(value) => field.onChange(value)}
        >
          {type === "user" && <Input size="large" />}
        </AutoComplete>
      </Form.Item>
    )}
  />
);

export default UIAutoComplete;
