import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material';

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
        <FormControl
          fullWidth
          error={Boolean(errors[name])}
          style={styles.formItem}
        >
          <InputLabel>{label}</InputLabel>
          <Select
            {...field}
            label={label}
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {errors[name] && (
            <FormHelperText style={styles.error}>{errors[name].message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

export default UIFormSelect;
