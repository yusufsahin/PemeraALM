import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import {
  getWorkitemsByProjectId,
  changeWorkitem,
  deleteWorkitem,
} from "./workitemSlice";
import { Typography, List, Button, Collapse, Spin, Modal, Divider } from "antd";
import { openModal } from "../modal/modalSlice";
import { Workitem } from "../../app/models/Workitem";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import parse from "html-react-parser";
import { Project } from "../../app/models/Project";
import TaskList from "../task/TaskList";

const { Panel } = Collapse;

const WorkitemList: React.FC<{ currentProject?: Project }> = ({
  currentProject,
}) => {
  const workitems = useAppSelector((state) => state.workitem.workitems);
  const loading = useAppSelector((state) => state.workitem.loading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (currentProject) {
        if (currentProject.id !== null)
          await dispatch(getWorkitemsByProjectId(currentProject.id));
      }
    };
    fetchData();
  }, [currentProject]);

  const handleEditClick = (workitem: Workitem) => {
    dispatch(changeWorkitem(workitem)).then(() => {
      dispatch(openModal({ modalType: "WorkitemEditModal", modalProps: {id:workitem.id} }));
    });
  };

  const handleRemove = (workitem: Workitem) => {
    Modal.confirm({
      title: "Do you want to remove this workitem?",
      content: "Once removed, the workitem cannot be recovered.",
      async onOk() {
        if (workitem.id !== null && workitem.id !== undefined) {
          await dispatch(deleteWorkitem({ id: workitem.id }));
        }
      },
      onCancel() {
        // Do nothing
      },
    });
  };
  const handleAddTask = (workitem: Workitem) => {
    dispatch(changeWorkitem(workitem)).then(() => {
      dispatch(openModal({ modalType: "TaskNewModal", modalProps: {} }));
    });
  };
  const dateConverter = (date: Date | undefined | null) => {
    if (date) {
      const dateObject = new Date(date);
      const formattedDate = dateObject.toISOString().split("T")[0];
      return formattedDate;
    }
    return ""; // Handle null or undefined dates by returning an empty string or a default value
  };


  if (loading) {
    return <Spin />;
  }

  return workitems[0]?.id === undefined ? (
    <div>
      <Divider></Divider>
      <strong>This project does not have any workitem and task</strong>
    </div>
  ) : (
    <div>
      <Divider></Divider>
      {/*<Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() =>
          dispatch(openModal({ modalType: "WorkitemNewModal", modalProps: {} }))
        }
      ></Button>*/}
      <Typography.Title style={{ fontSize: "30px" }}>
        Workitem List
      </Typography.Title>
      <Collapse>
        {workitems.map(
          (workitem, index) =>
            workitem ? ( // Check if workitem is not undefined
              <Panel
                header={
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography.Text strong>{workitem.name}</Typography.Text>
                    <div>
                      <Button
                        style={{ marginRight: "7px", color: "blue" }}
                        onClick={() => handleEditClick(workitem)}
                        icon={<EditOutlined />}
                      />
                      <Button
                        danger
                        style={{marginRight:"7px"}}
                        onClick={() => handleRemove(workitem)}
                        icon={<DeleteOutlined />}
                      />
                      <Button
                        onClick={() => handleAddTask(workitem)}
                        icon={<PlusOutlined />}
                      />
                    </div>
                  </div>
                }
                key={workitem.id?.toString() || index.toString()} // Fallback to index if id is not available
              >
                <p>Description : {workitem.description||""}</p>
                <p>Point: {workitem.point||""}</p>
                <p>Responsible User: {workitem.responsibleUser || ""}</p>
                <p>Due Date: {dateConverter(workitem.dueDate) || ""}</p>
                <p>Expected Date: {dateConverter(workitem.expectedDate) || ""}</p>
                <p>Actual Date: {dateConverter(workitem.actualDate) || ""}</p>
                <p>State: {workitem.state || ""}</p>
                <p>Type: {workitem.type || ""}</p>
                <p>Category: {workitem.category || ""}</p>
                <div>
                  ProjectId: {workitem.projectId ? workitem.projectId : "N/A"}
                </div>
                <TaskList currentWorkitem={workitem}></TaskList>
              </Panel>
            ) : null // Skip rendering if workitem is undefined
        )}
      </Collapse>
    </div>
  );
};

export default WorkitemList;
