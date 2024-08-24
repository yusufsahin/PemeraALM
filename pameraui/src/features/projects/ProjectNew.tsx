import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box, Grid, Button } from '@mui/material';
import { useAppDispatch } from '../../app/store/hooks';
import UIFormDateTimePicker from '../../components/UIFormDateTimePicker';
import UIFormInput from '../../components/UIFormInput';
import UIFormSelect from '../../components/UIFormSelect';
import { Project, ProjectStatus } from './type';
import { createProject } from './projectSlice';


const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().nullable(),
  startDate: yup.date().nullable(),
  endDate: yup.date().nullable(),
  status: yup.number().nullable()
});

const ProjectNew: React.FC = () => {
  const initialProject: Project = {
    _id: "",
    id: "",
    name: "",
    description: null,
    startDate: null,
    endDate: null,
    status: null,
  };

  const { handleSubmit, control, reset, formState: { errors } } = useForm<Project>({
    defaultValues: initialProject,
    resolver: yupResolver(schema) as any,
  });

  const dispatch = useAppDispatch();

  const onSubmit = (data: Project) => {
    dispatch(createProject(data))
      .then(() => {
        reset(initialProject);
       // dispatch(closeModal());
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
            options={[
              { label: '', value: '' },
              { label: 'Initiation', value: ProjectStatus.Initiation },
              { label: 'Planning', value: ProjectStatus.Planning },
              { label: 'Execution', value: ProjectStatus.Execution },
              { label: 'Monitor', value: ProjectStatus.Monitor },
              { label: 'Closed', value: ProjectStatus.Closed },
            ]}
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
