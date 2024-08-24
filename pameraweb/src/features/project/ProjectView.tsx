import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { Typography, Card, Space, Collapse, Button, Modal } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, SelectOutlined } from '@ant-design/icons';
import { changeProject, deleteProject } from './projectSlice';
import { openModal } from '../modal/modalSlice';
import { Project } from '../../app/models/Project';
import parse from "html-react-parser";

const { Title, Text } = Typography;
const { Panel } = Collapse;

const ProjectView: React.FC = () => {
  const currentProject = useAppSelector((state) => state.project.currentProject);
  const dispatch = useAppDispatch();
  
  const handleEditClick = (project: Project) => {
    dispatch(changeProject(project)).then(() => {
      dispatch(openModal({ modalType: "ProjectEditModal", modalProps: {} }));
    });
  };

  const handleRemove = (project: Project) => {
    Modal.confirm({
      title: "Do you want to remove this project?",
      content: "Once removed, the project cannot be recovered.",
      async onOk() {
        if (project.id !== null && project.id !== undefined) {
          await dispatch(deleteProject({ id: project.id }));
        }
      },
      onCancel() {
        // Do nothing
      },
    });
  };

  const handleAddWorkitem = (project: Project) => {
    dispatch(changeProject(project)).then(() => {
      dispatch(openModal({ modalType: "WorkitemNewModal", modalProps: {} }));
    });
  };


  if (!currentProject || currentProject.id === undefined) {
    return <Text>No project selected.</Text>;
  }

  return (
    <div>
      <Typography.Title style={{ fontSize: "30px" }}>Project List</Typography.Title>
      <Collapse>
        <Panel
          header={
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography.Text strong>{currentProject.name}</Typography.Text>
              <div>
                <Button
                  style={{ marginRight: "7px", color: "blue" }}
                  onClick={() => handleEditClick(currentProject)}
                  icon={<EditOutlined />}
                />
                <Button
                  danger
                  style={{ marginRight: "7px" }}
                  onClick={() => handleRemove(currentProject)}
                  icon={<DeleteOutlined />}
                />
                <Button
                  style={{ color: "black" }}
                  onClick={() => handleAddWorkitem(currentProject)}
                  icon={<PlusOutlined />}
                />
              </div>
            </div>
          }
          key={String(currentProject.id)} // Fallback to index if id is not available
        >
          <p>Description: {currentProject.description}</p>
          <p>Scope: {currentProject.scope}</p>
          <p>Manager: {currentProject.projectManager || "N/A"}</p>
          <p>Assistant: {currentProject.projectAssistant || "N/A"}</p>
          <p>
            Start Date: {String(currentProject.startDate) || "N/A"}
          </p>
          <p>
            Finish Date: {String(currentProject.finishDate) || "N/A"}
          </p>
          <p>Status: {currentProject.status || "N/A"}</p>
          <div>Memo: {currentProject.memo ? parse(currentProject.memo) : "N/A"}</div>
       
        </Panel>
       
      </Collapse>
     
    </div>
  );
};

export default ProjectView;
