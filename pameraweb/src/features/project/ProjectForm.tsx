import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Divider, Row, Col } from "antd";
import UIFormInput from "../../app/components/ui/UIFormInput";
import UIFormDateTimePicker from "../../app/components/ui/UIFormDateTimePicker";
import UIFormSelect from "../../app/components/ui/UIFormSelect";
import UIFormRichText from "../../app/components/ui/UIFormRichText";
import UIFormInputArea from "../../app/components/ui/UIFormInputArea";
import UIAutoComplete from "../../app/components/ui/UIAutoComplete";
import { Project } from "../../app/models/Project";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { fetchUsers } from "../../features/user/userSlice";
import { User } from "../../features/user/type";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";

const ProjectForm: React.FC<{
  initialValues: Project;
  onSubmit: (data: Project) => void;
  schema: any;
}> = ({ initialValues, onSubmit, schema }) => {
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const userOptions = users.map((user: User) => ({
    value: user.id ?? '',
    label: `${user.firstname} ${user.lastname}`,
  }));

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<Project>({
    defaultValues: initialValues,
    resolver: yupResolver(schema) as any,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <UIFormInput
        name="name"
        control={control}
        errors={errors}
        label="Name"
        placeholder="Enter project name"
      />

      <Row gutter={16}>
        <Col span={12}>
          <UIAutoComplete
            type="user"
            name="projectManager"
            control={control}
            errors={errors}
            label="Project Manager"
            placeholder="Enter Project Manager"
            options={userOptions}
          />
        </Col>
        <Col span={12}>
          <UIAutoComplete
            type="user"
            name="projectAssistant"
            control={control}
            errors={errors}
            label="Project Assistant"
            placeholder="Enter Project Assistant"
            options={userOptions}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <UIFormDateTimePicker
            name="startDate"
            control={control}
            errors={errors}
            label="Start Date"
            placeholder="Enter Start Date"
          />
        </Col>
        <Col span={8}>
          <UIFormDateTimePicker
            name="finishDate"
            control={control}
            errors={errors}
            label="Finish Date"
            placeholder="Enter Finish Date"
          />
        </Col>
        <Col span={8}>
          <UIAutoComplete
            name="status"
            type="default"
            control={control}
            errors={errors}
            label="Status"
            placeholder="Enter Status"
            options={[
              { value: "Initiation", label: "Initiation" },
              { value: "Planning", label: "Planning" },
              { value: "Execution", label: "Execution" },
              { value: "Monitoring", label: "Monitoring" },
              { value: "Closed", label: "Closed" },
            ]}
          />
        </Col>
      </Row>

      <UIFormInputArea
        name="scope"
        control={control}
        errors={errors}
        label="Scope"
        placeholder="Enter project scope"
      />
      <UIFormInputArea
        name="description"
        control={control}
        errors={errors}
        label="Description"
        placeholder="Enter project description"
      />
      <UIFormRichText
        name="memo"
        control={control}
        label="Memo"
        defaultValue={initialValues.memo ?? undefined}
      />
      <Divider />
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          disabled={!isValid || !isDirty}
        >
          Submit
        </Button>
        <Button
          type="default"
          onClick={() => reset(initialValues)}
          disabled={!isDirty}
        >
          Reset
        </Button>
      </Form.Item>
    </form>
  );
};

export default ProjectForm;
