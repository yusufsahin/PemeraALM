import React from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Grid, Button } from '@mui/material';
import { useAppDispatch } from '../../app/store/hooks';
import UIFormDateTimePicker from '../../components/UIFormDateTimePicker';
import UIFormInput from '../../components/UIFormInput';
import UIFormSelect from '../../components/UIFormSelect';

import { createProject } from './projectSlice';
import { ProjectStatus, Project } from './type';

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().nullable(),
  memo: yup.string().nullable(),
  scope: yup.string().nullable(),
  projectManager: yup.string().nullable(),
  projectAssistant: yup.string().nullable(),
  startDate: yup.date().nullable(),
  endDate: yup.date().nullable(),
  status: yup.mixed<ProjectStatus>().oneOf(Object.values(ProjectStatus)).nullable(),
});

const initialProject: Project = {
  _id: "",
  id: "",
  name: "",
  description: "",  // Empty string instead of null
  memo: "",         // Empty string instead of null
  scope: "",        // Empty string instead of null
  projectManager: "", // Empty string instead of null
  projectAssistant: "", // Empty string instead of null
  startDate: null,
  endDate: null,
  status: null  // Empty string instead of null
};

const ProjectNew: React.FC = () => {
  const { handleSubmit, control, reset, formState: { errors } } = useForm<Project>({
    defaultValues: initialProject,
    resolver: yupResolver(schema) as unknown as Resolver<Project>, 
  });

  const dispatch = useAppDispatch();

  const onSubmit = (data: Project) => {
    dispatch(createProject(data))
      .then(() => {
        reset(initialProject);
        // Optionally, you can dispatch an action to close the modal or perform another action
      })
      .catch((error) => {
        console.error("Failed to save the project:", error);
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <UIFormInput
            name="name"
            control={control}
            errors={errors}
            label="Project Name"
            placeholder="Enter project name"
          />
        </Grid>

        <Grid item xs={12}>
          <UIFormInput
            name="description"
            control={control}
            errors={errors}
            label="Description"
            placeholder="Enter project description"
            type="text"
          />
        </Grid>

        <Grid item xs={12}>
          <UIFormInput
            name="memo"
            control={control}
            errors={errors}
            label="Memo"
            placeholder="Enter memo"
            type="text"
          />
        </Grid>

        <Grid item xs={12}>
          <UIFormInput
            name="scope"
            control={control}
            errors={errors}
            label="Scope"
            placeholder="Enter project scope"
            type="text"
          />
        </Grid>

        <Grid item xs={12}>
          <UIFormInput
            name="projectManager"
            control={control}
            errors={errors}
            label="Project Manager"
            placeholder="Enter project manager name"
            type="text"
          />
        </Grid>

        <Grid item xs={12}>
          <UIFormInput
            name="projectAssistant"
            control={control}
            errors={errors}
            label="Project Assistant"
            placeholder="Enter project assistant name"
            type="text"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <UIFormDateTimePicker
            name="startDate"
            control={control}
            errors={errors}
            label="Start Date"
            placeholder="Select start date"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <UIFormDateTimePicker
            name="endDate"
            control={control}
            errors={errors}
            label="End Date"
            placeholder="Select end date"
          />
        </Grid>

        <Grid item xs={12}>
          <UIFormSelect
            name="status"
            control={control}
            errors={errors}
            label="Status"
            options={Object.values(ProjectStatus).map((status) => ({
              label: status as string,  // Ensuring label is a string
              value: status as string,  // Casting the value to string
            }))}
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Save Project
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectNew;
