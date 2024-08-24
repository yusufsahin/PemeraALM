import React from 'react';

import { useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '../../app/store/configureStore';
import { saveProject } from './projectSlice';
import { closeModal } from '../modal/modalSlice';
import ProjectForm from './ProjectForm'
import { Project } from '../../app/models/Project';


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

const ProjectNew: React.FC = () => {
  const initialProject: Project = {

    name: "",
    description: "",
    scope: "",
    memo: "",
    projectManager: "",
    projectAssistant: "",
    startDate: undefined,
    finishDate: undefined,
    status: "",
  };
  const { handleSubmit, control, reset, formState: { errors } } = useForm<Project>({
    defaultValues: initialProject,
    resolver: yupResolver(schema) as any,
  });

  const dispatch = useAppDispatch();

  const onSubmit = (data: Project) => {
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
    dispatch(saveProject(data))
      .then(() => {
        reset(initialProject);
        dispatch(closeModal());
      })
      .catch((error) => {
        console.error("Failed to save the project:", error);
      });
  };

  return <ProjectForm initialValues={initialProject} onSubmit={onSubmit} schema={schema} />;

};

export default ProjectNew;
