import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextField, Box, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, FormHelperText } from "@mui/material";

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
    marginBottom: 16,  // Adjusted for consistent spacing
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
      <Box sx={styles.formItem}>
        {type === "password" || type === "text" ? (
          <TextField
            {...field}
            type={type}
            label={<span style={styles.label}>{label}</span>}
            placeholder={placeholder}
            error={!!errors[name]}
            helperText={errors[name] ? errors[name].message : ""}
            sx={styles.input}
            fullWidth
          />
        ) : type === "radio" ? (
          <FormControl component="fieldset" error={!!errors[name]}>
            <FormLabel component="legend" sx={styles.label}>
              {label}
            </FormLabel>
            <RadioGroup {...field}>
              {options?.map((option) => (
                <FormControlLabel
                  key={option.value.toString()}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
            {errors[name] && (
              <FormHelperText sx={styles.error}>
                {errors[name].message}
              </FormHelperText>
            )}
          </FormControl>
        ) : null}
      </Box>
    )}
  />
);

export default UIFormInput;
