import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { getProjects } from './projectSlice';
import ProjectMenu from './ProjectMenu';
import ProjectView from './ProjectView';
import { Spin } from 'antd';
import './ProjectDetailsView.css';  // Import the CSS

const ProjectDetailsView: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.project.loading);
  const projects = useAppSelector((state) => state.project.projects);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getProjects());
    };
    fetchData();
  }, [dispatch]);

  if (loading) {
    return <Spin />;
  }

  return (
    <div className="container">
      <div className="project-menu" style={{marginTop:"30px"}}>
        <ProjectMenu projects={projects} />
      </div>
      <div className="project-view">
        <ProjectView />
      </div>
    </div>
  );
};

export default ProjectDetailsView;
