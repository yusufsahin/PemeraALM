import React from "react";

import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { saveTask } from "./taskSlice";
import { closeModal } from "../modal/modalSlice";
import TaskForm from "./TaskForm";
import { Task } from "../../app/models/Task";
import { getWorkitemsByProjectId } from "../workitem/workitemSlice";

const schema = yup.object().shape({
  name: yup.string().min(2).required("Name field must be filled"),
  description: yup.string().nullable(),
  dueDate: yup.date().nullable(),
  expectedDate: yup.date().nullable(), // Allow null values for finishDate
  actualDate: yup.date().nullable(), // Allow null values for finishDate
  hoursExpected: yup.number().nullable(),
  hoursActual: yup.number().nullable(),
  assignTo: yup.string().nullable(),
  type: yup.string().nullable(),
  category: yup.string().nullable(),
  status: yup.string().nullable(),
});

const TaskNew: React.FC = () => {
  const currentWorkitem = useAppSelector(
    (state) => state.workitem.currentWorkitem
  );
  const currentProject = useAppSelector(
    (state) => state.project.currentProject
  );
  const initialTask: Task = {
    name: "",
    description: "",
    hoursExpected: undefined,
    hoursActual: undefined,
    assignTo: "",
    type: "",
    category: "",
    status: "",
    dueDate: undefined,
    actualDate: undefined,
    expectedDate: undefined,
    workitemId: currentWorkitem.id,
  };
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Task>({
    defaultValues: initialTask,
    resolver: yupResolver(schema) as any,
  });

  const dispatch = useAppDispatch();

  const onSubmit = (data: Task) => {
    // Check if the dropdown fields have not been selected and set them to null
    if (!data.type) {
      data.type = null;
    }
    if (!data.category) {
      data.category = null;
    }
    if (!data.status) {
      data.status = null;
    }
    if(!data.assignTo){
      data.assignTo=null
    }
    if(!data.description){
      data.description=null
    }

    dispatch(saveTask(data))
      .then(() => {
        reset(initialTask);
        dispatch(closeModal());
        if (currentProject) {
          if (currentProject.id !== null)
            dispatch(getWorkitemsByProjectId(currentProject.id));
        }
      })
      .catch((error) => {
        console.error("Failed to save the task:", error);
      });
  };

  return (
    <TaskForm initialValues={initialTask} onSubmit={onSubmit} schema={schema} />
  );
};

export default TaskNew;
