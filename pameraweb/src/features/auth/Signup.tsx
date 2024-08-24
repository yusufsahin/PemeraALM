import React, { useEffect, useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, FloatButton, Tooltip, notification } from "antd";
import UIFormInput from "../../app/components/ui/UIFormInput";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { login, register } from "./securitySlice";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CheckOutlined } from "@ant-design/icons";

const schema = yup.object().shape({
    firstname: yup.string().min(2).required(),
    lastname: yup.string().min(2).required(),
    email: yup.string().email().required(),
    username: yup.string().required("Username is required"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  });
  

interface FormValues {
    firstname:string;
    lastname:string;
    email:string;
    username: string;
    password: string;
  }
  

const Signup: React.FC = () => {
  const initialValues: FormValues = {
    firstname: "",
    lastname: "",
    email:"",
    username:"",
    password:""
  };

  const { isRegistered, err } = useAppSelector((state) => state.security);
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
    if (isRegistered) {
      navigate("/signin", { replace: true });
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
        <UIFormInput
        name="firstname"
        control={control}
        errors={errors}
        label="FirstName"
        placeholder="Enter a FirstName"
      />
      <UIFormInput
        name="lastname"
        control={control}
        errors={errors}
        label="LastName"
        placeholder="Enter a LastName"
      />
      <UIFormInput
        name="email"
        control={control}
        errors={errors}
        label="Email"
        placeholder="Enter a Email"
      />
      <UIFormInput
        name="username"
        control={control}
        errors={errors}
        label="Username"
        placeholder="Enter a username"
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
        
      </div>
    </form>
  );
};

export default Signup;
