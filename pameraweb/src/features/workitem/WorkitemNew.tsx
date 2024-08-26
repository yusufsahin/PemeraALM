import React from 'react';

import { useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { saveWorkitem } from './workitemSlice';
import { closeModal } from '../modal/modalSlice';
import WorkitemForm from './WorkitemForm'
import { Workitem } from '../../app/models/Workitem';


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
  projectId: yup.number().required("Project Id field must be filled"),
});

const WorkitemNew: React.FC = () => {
  const currentProject = useAppSelector((state) => state.project.currentProject);
  const initialWorkitem: Workitem = {

    name: "",
    description: "",
    point: undefined,
    responsibleUser: "",
    type: "",
    category:"",
    state: "",
    dueDate: undefined,
    actualDate: undefined,
    expectedDate:undefined,
    projectId:currentProject.id ?? undefined
    
  };
  const { handleSubmit, control, reset, formState: { errors } } = useForm<Workitem>({
    defaultValues: initialWorkitem,
    resolver: yupResolver(schema) as any,
  });

  const dispatch = useAppDispatch();

  const onSubmit = (data: Workitem) => {
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
    dispatch(saveWorkitem(data))
      .then(() => {
        reset(initialWorkitem);
        dispatch(closeModal());
      })
      .catch((error) => {
        console.error("Failed to save the workitem:", error);
      });
  };

  return <WorkitemForm initialValues={initialWorkitem} onSubmit={onSubmit} schema={schema} />;

};

export default WorkitemNew;
