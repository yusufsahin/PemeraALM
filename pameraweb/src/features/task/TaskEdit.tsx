import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { getTasks, updateTask } from "./taskSlice";
import { closeModal } from "../modal/modalSlice";
import TaskForm from "./TaskForm";
import { Spin } from "antd";
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

const TaskEdit: React.FC = () => {
  const currentTask = useAppSelector(
    (state) => state.task.currentTask
  );
  const currentProject = useAppSelector(
    (state) => state.project.currentProject
  );

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Task>({
    defaultValues: currentTask, // Use currentNote as the initial values
    resolver: yupResolver(schema) as any,
  });
  useEffect(() => {
    let defaults = {
      id: currentTask.id,
      name: currentTask.name,
      description: currentTask.description,
      assignTo: currentTask.assignTo,
      dueDate: currentTask.dueDate,
      expectedDate: currentTask.expectedDate,
      actualDate:currentTask.actualDate,
      hoursActual: currentTask.hoursActual,
      hoursExpected: currentTask.hoursExpected,
      status: currentTask.status,
      type: currentTask.type,
      category: currentTask.category,
      workitemId:currentTask.workitemId
    };
    reset(defaults);
  }, [currentTask, reset]);

  const dispatch = useAppDispatch();

  const onSubmit = async (data: Task) => {
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
    await dispatch(updateTask(data))
      .then(() => {
        dispatch(closeModal());
      })
      .then(async () => {
        await dispatch(getTasks(data.workitemId ?? undefined));
        if (currentProject) {
          if (currentProject.id !== null)
             await dispatch(getWorkitemsByProjectId(currentProject.id));
        }
      })
      .catch((error) => {
        console.error("Failed to save the task:", error);
      });
  };
  if (!currentTask) {
    return <Spin tip="Loading..." />;
  }
  return (
    <TaskForm
      initialValues={currentTask}
      onSubmit={onSubmit}
      schema={schema}
    />
  );
};

export default TaskEdit;
