import React from "react";
import { Control, Controller } from "react-hook-form";
import {  Box } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

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
      <Box sx={styles.formItem}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            {...field}
            label={<span style={styles.label}>{label}</span>}
            onChange={(date: Dayjs | null) => {
              const dateString = date ? date.format("YYYY-MM-DD") : "";
              field.onChange(dateString);
            }}
            value={field.value ? dayjs(field.value, "YYYY-MM-DD") : null}
            slotProps={{
              textField: {
                placeholder: placeholder,
                error: !!errors[name],
                helperText: errors[name] ? errors[name].message : "",
                sx: styles.input,
              },
            }}
          />
        </LocalizationProvider>
      </Box>
    )}
  />
);

export default UIFormDateTimePicker;
