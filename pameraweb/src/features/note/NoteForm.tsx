import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Divider } from "antd";
import UIFormInput from "../../app/components/ui/UIFormInput";
import { Note } from "../../app/models/Note";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import UIFormRichText from "../../app/components/ui/UIFormRichText";

const NoteForm: React.FC<{
  initialValues: Note;
  onSubmit: (data: Note) => void;
  schema: any;
}> = ({ initialValues, onSubmit, schema }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<Note>({
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
        placeholder="Enter note name"
      />

      <UIFormInput
        name="description"
        control={control}
        errors={errors}
        label="Description"
        placeholder="Enter note description"
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

export default NoteForm;
