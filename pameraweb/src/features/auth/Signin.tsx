import React, { useEffect, useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, FloatButton, Tooltip, notification } from "antd";
import UIFormInput from "../../app/components/ui/UIFormInput";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { login } from "./securitySlice";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CheckOutlined } from "@ant-design/icons";

const schema = yup.object().shape({
  identifier: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

interface FormValues {
  identifier: string;
  password: string;
}

const Signin: React.FC = () => {
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
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (err) {
      notification.error({ message: "Error", description: err });
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <UIFormInput
        name="identifier"
        control={control}
        errors={errors}
        label="Username Or Email"
        placeholder="Enter a username or email"
      />

      <UIFormInput
        name="password"
        control={control}
        errors={errors}
        label="Password"
        type="password"
        placeholder="Enter a password"
      />

      <div>
        <Tooltip title="search">
          <Button
            type="primary"
            icon={<CheckOutlined />}
            htmlType="submit"
          >
            OK
          </Button>
        </Tooltip>
        <div style={{ textAlign: "center" }}>
          <Link to="/signup" >Sign Up</Link>
        </div>
        
      </div>
    </form>
  );
};

export default Signin;
