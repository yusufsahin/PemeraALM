import React, { useEffect } from 'react';
import { List, Button, Divider } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { changeProject } from './projectSlice';
import { Project } from '../../app/models/Project';

interface ProjectMenuProps {
  projects: Project[];
}

const ProjectMenu: React.FC<ProjectMenuProps> = ({ projects }) => {
  const dispatch = useAppDispatch();
  const currentProject = useAppSelector((state) => state.project.currentProject);

  useEffect(() => {
    if (currentProject.id === null && projects.length > 0) {
      dispatch(changeProject(projects[0]));
    }
  }, [projects, currentProject.id, dispatch]);

  const handleSelect = async (project:Project) => {
    if (project.id !== null && project.id !== undefined) {
      await dispatch(changeProject(project));
    }
  };
  

  return (
    <div>
   <List
        header={<strong> All Projects:</strong>}
        footer={<div>Footer</div>}
        bordered
        dataSource={projects}
        renderItem={(item) => (
          <List.Item>
            <Button onClick={() => handleSelect(item)}>{item.name}</Button>
          </List.Item>
        )}
      />

    </div>
  );
};

export default ProjectMenu;
