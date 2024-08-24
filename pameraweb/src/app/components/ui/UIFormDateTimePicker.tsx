import React from "react";
import { Control, Controller } from "react-hook-form";
import { DatePicker, Form } from "antd";
import dayjs from "dayjs";

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
    width: "270px",
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
}

const UIFormDateTimePicker: React.FC<FormFieldProps> = ({
  name,
  control,
  errors,
  label,
  placeholder,
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
        <DatePicker
          {...field}
          format="YYYY-MM-DD" //"YYYY-MM-DD HH:mm:ss" 
          placeholder={placeholder}
          style={styles.input}
          onChange={(date, dateString) => {
            console.log(dayjs(field.value))
            field.onChange(dateString);
            console.log(dayjs(field.value))
          }}
          value={field.value ? dayjs(field.value, "YYYY-MM-DD") : null}
        />
      </Form.Item>
    )}
  />
);

export default UIFormDateTimePicker;
