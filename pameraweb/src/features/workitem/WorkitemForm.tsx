import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Divider, Row, Col } from "antd";
import UIFormInput from "../../app/components/ui/UIFormInput";
import UIFormDateTimePicker from "../../app/components/ui/UIFormDateTimePicker";
import UIFormSelect from "../../app/components/ui/UIFormSelect";
import UIFormRichText from "../../app/components/ui/UIFormRichText";
import UIFormInputArea from "../../app/components/ui/UIFormInputArea";
import { Workitem } from "../../app/models/Workitem";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import UIAutoComplete from "../../app/components/ui/UIAutoComplete";

const WorkitemForm: React.FC<{
  initialValues: Workitem;
  onSubmit: (data: Workitem) => void;
  schema: any;
}> = ({ initialValues, onSubmit, schema }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<Workitem>({
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
        placeholder="Enter Workitem name"
      />

      <Row gutter={16}>
        <Col span={8}>
          <UIAutoComplete
            type="default"
            name="type"
            control={control}
            errors={errors}
            label="Type"
            placeholder="Enter Workitem type"
            options={[
              { value: "Request", label: "Request" },
              { value: "UserStory", label: "UserStory" },
              { value: "Bug", label: "Bug" },
              { value: "Ticket", label: "Ticket" },
            ]}
          />
        </Col>
        <Col span={8}>
          <UIAutoComplete
            type="default"
            name="category"
            control={control}
            errors={errors}
            label="Workitem Category"
            placeholder="Enter Workitem category"
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
            name="state"
            control={control}
            errors={errors}
            label="Workitem State"
            placeholder="Enter Workitem State"
            options={[
              { value: "Cancelled", label: "Cancelled" },
              { value: "Blocked", label: "Blocked" },
              { value: "InBackLog", label: "InBackLog" },
              { value: "WIP", label: "WIP" },
              { value: "ReadyToTest", label: "ReadyToTest" },
              { value: "InTest", label: "InTest" },
              { value: "Deployed", label: "Deployed" },
              { value: "Released", label: "Released" },
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
        <Col span={12}>
          <UIFormInput
            name="point"
            control={control}
            errors={errors}
            label="Point"
            placeholder="Enter Point"
          />
        </Col>
        <Col span={12}>
          <UIFormInput
            name="responsibleUser"
            control={control}
            errors={errors}
            label="Responsible User"
            placeholder="Enter Responsible User"
          />
        </Col>
      </Row>

      <UIFormInputArea
        name="description"
        control={control}
        errors={errors}
        label="Description"
        placeholder="Enter Workitem description"
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

export default WorkitemForm;
