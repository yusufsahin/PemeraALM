import React from "react";
import { Control, Controller } from "react-hook-form";
import { Autocomplete, TextField, Box, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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
  options?: any; // Options for Autocomplete
}

const UIAutoComplete: React.FC<FormFieldProps> = ({
  name,
  control,
  errors,
  label,
  placeholder,
  options,
  type,
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <Box sx={styles.formItem}>
        <Autocomplete
          {...field}
          options={options}
          getOptionLabel={(option: any) => option.label}
          renderInput={(params) => (
            <TextField
              {...params}
              label={<span style={styles.label}>{label}</span>}
              placeholder={placeholder}
              error={!!errors[name]}
              helperText={errors[name] ? errors[name].message : ""}
              InputProps={{
                ...params.InputProps,
                startAdornment: type === "user" && (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={styles.input}
            />
          )}
        />
        {errors[name] && (
          <span style={styles.error}>{errors[name].message}</span>
        )}
      </Box>
    )}
  />
);

export default UIAutoComplete;
