import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { getProjects, changeProject, deleteProject } from "./projectSlice";
import { Typography, Button, Collapse, Spin, Modal } from "antd";
import { openModal } from "../modal/modalSlice";
import { Project } from "../../app/models/Project";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

const { Panel } = Collapse;

const ProjectList: React.FC = () => {
  const projects = useAppSelector((state) => state.project.projects);
  const loading = useAppSelector((state) => state.project.loading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getProjects());
    };
    fetchData();
  }, [dispatch]);

  const handleEditClick = (project: Project) => {
    dispatch(changeProject(project)).then(() => {
      dispatch(openModal({ modalType: "ProjectEditModal", modalProps: { id: project.id } }));
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

  if (loading) {
    return <Spin />;
  }

  const renderContent = (content: any) => {
    try {
      if (content && typeof content === "object" && content.blocks && content.entityMap) {
        // Convert Draft.js content state to HTML
        const contentState = convertFromRaw(content);
        return <div dangerouslySetInnerHTML={{ __html: stateToHTML(contentState) }} />;
      } else if (typeof content === "string") {
        // If content is a plain string
        return <div>{content}</div>;
      } else {
        return "N/A";
      }
    } catch (error) {
      console.error("Error rendering content:", error);
      return "Invalid content";
    }
  };

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() =>
          dispatch(openModal({ modalType: "ProjectNewModal", modalProps: {} }))
        }
      >
        Add Project
      </Button>
      <Typography.Title style={{ fontSize: "30px" }}>Project List</Typography.Title>
      <Collapse>
        {projects.map((project, index) =>
          project ? (
            <Panel
              header={
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography.Text strong>{project.name}</Typography.Text>
                  <div>
                    <Button
                      style={{ marginRight: "7px", color: "blue" }}
                      onClick={() => handleEditClick(project)}
                      icon={<EditOutlined />}
                    />
                    <Button
                      danger
                      style={{ marginRight: "7px" }}
                      onClick={() => handleRemove(project)}
                      icon={<DeleteOutlined />}
                    />
                    <Button
                      style={{ color: "black" }}
                      onClick={() => handleAddWorkitem(project)}
                      icon={<PlusOutlined />}
                    />
                  </div>
                </div>
              }
              key={project.id?.toString() || index.toString()}
            >
              <p>Description: {project.description || "N/A"}</p>
              <p>Scope: {renderContent(project.scope)}</p>
              <p>Manager: {project.projectManager || "N/A"}</p>
              <p>Assistant: {project.projectAssistant || "N/A"}</p>
              <p>Start Date: {project.startDate ? String(project.startDate) : "N/A"}</p>
              <p>Finish Date: {project.finishDate ? String(project.finishDate) : "N/A"}</p>
              <p>Status: {project.status || "N/A"}</p>
              <div>Memo: {renderContent(project.memo)}</div>
            </Panel>
          ) : null
        )}
      </Collapse>
    </div>
  );
};

export default ProjectList;
