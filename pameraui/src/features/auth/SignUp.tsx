import React, { useEffect, useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Tooltip, TextField, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CheckIcon from "@mui/icons-material/Check";

import { useAppDispatch, useAppSelector } from "../../app/store/hooks";


const schema = yup.object().shape({
  firstname: yup.string().min(2).required(),
  lastname: yup.string().min(2).required(),
  email: yup.string().email().required(),
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

interface FormValues {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
}

const Register: React.FC = () => {
  const initialValues: FormValues = {
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  };

  const { isRegistered, err } = useAppSelector((state) => state.security);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    register, // Add this line to access the register function
  } = useForm<FormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (err) {
      console.error(err);
    }
    if (isRegistered) {
      navigate("/register", { replace: true });
    }
  }, [isRegistered, navigate, err]);

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    (data) => {
      console.log(data);
      dispatch(register(data));
    },
    [dispatch]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" gutterBottom>
        Sign Up
      </Typography>
      <TextField
        fullWidth
        label="First Name"
        placeholder="Enter your first name"
        margin="normal"
        {...register("firstname")} // Use the spread syntax here
        error={!!errors.firstname}
        helperText={errors.firstname?.message}
      />
      <TextField
        fullWidth
        label="Last Name"
        placeholder="Enter your last name"
        margin="normal"
        {...register("lastname")} // Use the spread syntax here
        error={!!errors.lastname}
        helperText={errors.lastname?.message}
      />
      <TextField
        fullWidth
        label="Email"
        placeholder="Enter your email"
        margin="normal"
        {...register("email")} // Use the spread syntax here
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        fullWidth
        label="Username"
        placeholder="Enter your username"
        margin="normal"
        {...register("username")} // Use the spread syntax here
        error={!!errors.username}
        helperText={errors.username?.message}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        placeholder="Enter your password"
        margin="normal"
        {...register("password")} // Use the spread syntax here
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <div>
        <Tooltip title="Submit">
          <Button
            variant="contained"
            color="primary"
            startIcon={<CheckIcon />}
            type="submit"
          >
            OK
          </Button>
        </Tooltip>
      </div>
    </form>
  );
};

export default Register;
