import React, { useEffect, useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Tooltip, TextField, IconButton, Snackbar } from "@mui/material";
import { Check } from "@mui/icons-material";

import { login } from "./securitySlice";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";

const schema = yup.object().shape({
  identifier: yup.string().required("Username or E-mail is required"),
  password: yup.string().required("Password is required"),
});

interface FormValues {
  identifier: string;
  password: string;
}

const Login: React.FC = () => {
  const initialValues: FormValues = {
    identifier: "",
    password: "",
  };

  const { isAuthenticated, err } = useAppSelector((state) => state.security);
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
      openNotification(err);
    }
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate, err]);

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    (data) => {
      console.log(data);
      dispatch(login(data));
    },
    [dispatch]
  );

  const openNotification = (message: string) => {
    Snackbar({
      open: true,
      autoHideDuration: 6000,
      message,
      anchorOrigin: { vertical: "top", horizontal: "center" },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Username or Email"
        {...register("identifier")} // Use the spread syntax here
        error={!!errors.identifier}
        helperText={errors.identifier?.message}
        fullWidth
        margin="normal"
        placeholder="Enter a username or email"
      />

      <TextField
        label="Password"
        {...register("password")} // Use the spread syntax here
        error={!!errors.password}
        helperText={errors.password?.message}
        type="password"
        fullWidth
        margin="normal"
        placeholder="Enter a password"
      />

      <div>
        <Tooltip title="Submit">
          <IconButton color="primary" type="submit">
            <Check />
          </IconButton>
        </Tooltip>
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </form>
  );
};

export default Login;
