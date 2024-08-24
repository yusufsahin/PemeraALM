import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { getProjects, updateProject } from "./projectSlice";
import { closeModal } from "../modal/modalSlice";
import { Project } from "../../app/models/Project";
import ProjectForm from "./ProjectForm";
import { Spin } from "antd";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string(),
  scope: yup.string(),
  memo: yup.string(),
  projectManager:yup.string(),
  projectAssistant:yup.string(),
  startDate:yup.date().nullable(),
  finishDate:yup.date().nullable(),
  status:yup.string(),
});

const ProjectEdit: React.FC = () => {
  const currentProject = useAppSelector((state) => state.project.currentProject);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Project>({
    defaultValues: currentProject, // Use currentNote as the initial values
    resolver: yupResolver(schema) as any,
  });
  useEffect(() => {
    let defaults = {
    id: currentProject.id,
    name: currentProject.name,
    description: currentProject.description,
    scope: currentProject.scope,
    memo: currentProject.memo,
    projectManager: currentProject.projectManager,
    projectAssistant: currentProject.projectAssistant,
    startDate: currentProject.startDate,
    finishDate: currentProject.finishDate,
    status: currentProject.status,
    };
    reset(defaults);
  }, [currentProject, reset]);

  const dispatch = useAppDispatch();

  const onSubmit = async (data: Project) => {
    if (!data.projectAssistant) {
      data.projectAssistant = null;
    }
    if (!data.projectManager) {
      data.projectManager = null;
    }
    if (!data.memo) {
      data.memo = null;
    }
    if(!data.scope){
      data.scope=null
    }
    if(!data.description){
      data.description=null
    }
    if(!data.status){
      data.status=null
    }
    await dispatch(updateProject(data))
      .then(() => {
        dispatch(closeModal());
      })
      .then(async () => {
        await dispatch(getProjects());
      })
      .catch((error) => {
        console.error("Failed to save the project:", error);
      });
  };
  if (!currentProject) {
    return <Spin tip="Loading..."/>;
  }
  return (
    <ProjectForm initialValues={currentProject} onSubmit={onSubmit} schema={schema} />
  );
};

export default ProjectEdit;
