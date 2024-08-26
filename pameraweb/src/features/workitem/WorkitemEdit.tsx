import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { getWorkitemsByProjectId, updateWorkitem } from "./workitemSlice";
import { closeModal } from "../modal/modalSlice";
import WorkitemForm from "./WorkitemForm";
import { Spin } from "antd";
import { Workitem } from "../../app/models/Workitem";
const schema = yup.object().shape({
  name: yup.string().min(2).required("Name field must be filled"),
  description: yup.string(),
  dueDate: yup.date().nullable(),
  expectedDate: yup.date().nullable(), // Allow null values for finishDate
  actualDate: yup.date().nullable(), // Allow null values for finishDate
  point: yup.number(),
  responsibleUser: yup.string(),
  type: yup.string(),
  category: yup.string(),
  state: yup.string(),
  projectId: yup.string().required("Project Id field must be filled"),
});

const WorkitemEdit: React.FC = () => {
  const currentWorkitem = useAppSelector(
    (state) => state.workitem.currentWorkitem
  );

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Workitem>({
    defaultValues: currentWorkitem, // Use currentNote as the initial values
    resolver: yupResolver(schema) as any,
  });
  useEffect(() => {
    let defaults = {
      id: currentWorkitem.id,
      name: currentWorkitem.name,
      description: currentWorkitem.description,
      point: currentWorkitem.point,
      dueDate: currentWorkitem.dueDate,
      expectedDate: currentWorkitem.expectedDate,
      actualDate:currentWorkitem.actualDate,
      responsibleUser: currentWorkitem.responsibleUser,
      tasks: currentWorkitem.tasks,
      state: currentWorkitem.state,
      type: currentWorkitem.type,
      category: currentWorkitem.category,
      projectId:currentWorkitem.projectId
    };
    reset(defaults);
  }, [currentWorkitem, reset]);

  const dispatch = useAppDispatch();

  const onSubmit = async (data: Workitem) => {
    if (!data.point) {
      data.point = null;
    }
    if (!data.responsibleUser) {
      data.responsibleUser = null;
    }
    if (!data.type) {
      data.type = null;
    }
    if(!data.category){
      data.category=null
    }
    if(!data.description){
      data.description=null
    }
    if(!data.state){
      data.state=null
    }
    await dispatch(updateWorkitem(data))
      .then(() => {
        dispatch(closeModal());
      })
      .then(async () => {
        await dispatch(getWorkitemsByProjectId(currentWorkitem.projectId ?? undefined));
      })
      .catch((error) => {
        console.error("Failed to save the workitem:", error);
      });
  };
  if (!currentWorkitem) {
    return <Spin tip="Loading..." />;
  }
  return (
    <WorkitemForm
      initialValues={currentWorkitem}
      onSubmit={onSubmit}
      schema={schema}
    />
  );
};

export default WorkitemEdit;
