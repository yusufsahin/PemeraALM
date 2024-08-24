import React, { useEffect } from "react";
import { Table, Row, Popconfirm, Space, Button, Modal, Spin } from "antd";
import Column from "antd/es/table/Column";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SelectOutlined,
} from "@ant-design/icons";

import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { changeProject, deleteProject, getProjects } from "./projectSlice";
import { openModal } from "../modal/modalSlice";
import { Project } from "../../app/models/Project";
import parse from "html-react-parser";

const ProjectTable: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.project.projects);
  const loading = useAppSelector((state) => state.project.loading);
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getProjects());
    };
    fetchData();
  }, []);
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
  const handleSelect = (project: Project) => {
    Modal.confirm({
      title: "Do you want to select this project?",
      async onOk() {
        if (project.id !== null && project.id !== undefined) {
          await dispatch(changeProject(project));
        }
      },
      onCancel() {
        // Do nothing
      },
    });
  };
  if (loading) {
    return <Spin />;
  }

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() =>
          dispatch(openModal({ modalType: "ProjectNewModal", modalProps: {} }))
        }
      ></Button>

      <Table dataSource={projects}>
        <Row>
          {/* Define your table columns */}
          <Column title="Id" dataIndex="id"></Column>
          <Column title="Name" dataIndex="name"></Column>
          <Column title="Description" dataIndex="description"></Column>
          <Column title="ProjectManager" dataIndex="projectManager"></Column>
          <Column
            title="ProjectAssistant"
            dataIndex="projectAssistant"
          ></Column>
          <Column title="Status" dataIndex="status"></Column>
          <Column title="Scope" dataIndex="scope"></Column>
          <Column
            title="Memo"
            dataIndex="memo"
            render={(memo: string) => parse(memo)}
          ></Column>
          <Column title="StartDate" dataIndex="startDate"></Column>
          <Column title="FinishDate" dataIndex="finishDate"></Column>
          <Column
            title="Actions"
            render={(_, record: any) => (
              <Space size="middle">
                <EditOutlined
                  style={{ color: "blue", fontSize: "25px" }}
                  onClick={() => {
                    handleEditClick(record);
                  }}
                ></EditOutlined>

                <DeleteOutlined
                  style={{ color: "red", fontSize: "25px" }}
                  onClick={() => {
                    handleRemove(record);
                  }}
                ></DeleteOutlined>

                <SelectOutlined
                  style={{ fontSize: "25px" }}
                  onClick={() => {
                    handleSelect(record);
                  }}
                ></SelectOutlined>
              </Space>
            )}
          ></Column>
        </Row>
      </Table>
    </div>
  );
};

export default ProjectTable;
