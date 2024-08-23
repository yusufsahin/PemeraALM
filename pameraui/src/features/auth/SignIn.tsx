import React, { useEffect, useCallback, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Tooltip, Snackbar, Alert, Button, Grid, Paper, Box, Avatar, CssBaseline, FormControlLabel, Checkbox } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { login } from "./securitySlice";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UIFormInput from "../../components/UIFormInput";


const schema = yup.object().shape({
  identifier: yup.string().required("Username or E-mail is required"),
  password: yup.string().required("Password is required"),
});

interface FormValues {
  identifier: string;
  password: string;
}

const defaultTheme = createTheme();

const SignIn: React.FC = () => {
  const initialValues: FormValues = {
    identifier: "",
    password: "",
  };

  const { isAuthenticated, err } = useAppSelector((state) => state.security);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (err) {
      setOpen(true);
    }
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate, err]);

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    (data) => {
      dispatch(login(data));
    },
    [dispatch]
  );

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url("./assets/img/login.png")',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'left',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, width: '100%', maxWidth: 360 }}>
              <UIFormInput
                name="identifier"
                control={control}
                errors={errors}
                label="Username or Email"
                placeholder="Enter your username or email"
              />
              <UIFormInput
                name="password"
                control={control}
                errors={errors}
                label="Password"
                placeholder="Enter your password"
                type="password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                sx={{ mt: 1, alignSelf: 'start' }}
              />
              <Tooltip title="Submit">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </Tooltip>
              <Grid container sx={{ mt: 2 }}>
                <Grid item xs>
                  <Typography variant="body2" sx={{ textAlign: 'left' }}>
                    <Link to="/forgot-password">Forgot password?</Link>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" sx={{ textAlign: 'right' }}>
                    <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {err}
              </Alert>
            </Snackbar>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignIn;
