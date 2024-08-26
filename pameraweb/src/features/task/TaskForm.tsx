import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Divider, Row, Col } from "antd";
import UIFormInput from "../../app/components/ui/UIFormInput";
import UIFormDateTimePicker from "../../app/components/ui/UIFormDateTimePicker";
import UIFormSelect from "../../app/components/ui/UIFormSelect";
import UIFormRichText from "../../app/components/ui/UIFormRichText";
import UIFormInputArea from "../../app/components/ui/UIFormInputArea";
import { Task } from "../../app/models/Task";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import UIAutoComplete from "../../app/components/ui/UIAutoComplete";

const TaskForm: React.FC<{
  initialValues: Task;
  onSubmit: (data: Task) => void;
  schema: any;
}> = ({ initialValues, onSubmit, schema }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<Task>({
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
        placeholder="Enter task name"
      />

      <Row gutter={16}>
        <Col span={8}>
          <UIAutoComplete
            type="default"
            name="type"
            control={control}
            errors={errors}
            label="Task Type"
            placeholder="Enter Task Type"
            options={[{ value: "Task", label: "Task" }]}
          />
        </Col>
        <Col span={8}>
          <UIAutoComplete
            type="default"
            name="category"
            control={control}
            errors={errors}
            label="Task Category"
            placeholder="Enter Task Category"
            options={[
              { value: "Analysis", label: "Analysis" },
              { value: "Development", label: "Development" },
              { value: "Test", label: "Test" },
              { value: "Operation", label: "Operation" },
              { value: "Document", label: "Document" },
            ]}
          />
        </Col>
        <Col span={8}>
          <UIAutoComplete
            type="default"
            name="status"
            control={control}
            errors={errors}
            label="Task Status"
            placeholder="Enter Task Status"
            options={[
              { value: "Cancelled", label: "Cancelled" },
              { value: "Blocked", label: "Blocked" },
              { value: "ToDo", label: "ToDo" },
              { value: "InProgress", label: "InProgress" },
              { value: "ToVerify", label: "ToVerify" },
              { value: "Done", label: "Done" },
            ]}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <UIFormDateTimePicker
            name="dueDate"
            control={control}
            errors={errors}
            label="Due Date"
            placeholder="Enter Due Date"
          />
        </Col>
        <Col span={8}>
          <UIFormDateTimePicker
            name="expectedDate"
            control={control}
            errors={errors}
            label="Expected Date"
            placeholder="Enter Expected Date"
          />
        </Col>
        <Col span={8}>
          <UIFormDateTimePicker
            name="actualDate"
            control={control}
            errors={errors}
            label="Actual Date"
            placeholder="Enter Actual Date"
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <UIFormInput
            name="hoursExpected"
            control={control}
            errors={errors}
            label="Hours Expected"
            placeholder="Enter Hours Expected"
          />
        </Col>
        <Col span={8}>
          <UIFormInput
            name="hoursActual"
            control={control}
            errors={errors}
            label="Hours Actual"
            placeholder="Enter Hours Actual"
          />
        </Col>
        <Col span={8}>
          <UIFormInput
            name="assignTo"
            control={control}
            errors={errors}
            label="Assign To"
            placeholder="Enter Assign To"
          />
        </Col>
      </Row>

      <UIFormInputArea
        name="description"
        control={control}
        errors={errors}
        label="Description"
        placeholder="Enter task description"
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

export default TaskForm;
