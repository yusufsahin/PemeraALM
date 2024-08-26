import React, { useEffect } from "react";
import { useAppDispatch } from "../../app/store/configureStore";
import { changeTask, deleteTask, getTasks } from "./taskSlice";
import { Typography, List, Button, Collapse, Spin, Modal, Divider } from "antd";
import { openModal } from "../modal/modalSlice";
import { Task } from "../../app/models/Task";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import parse from "html-react-parser";
import { Project } from "../../app/models/Project";
import { Workitem } from "../../app/models/Workitem";

const { Panel } = Collapse;

const TaskList: React.FC<{  currentWorkitem?:Workitem }> = ({
  currentWorkitem
}) => {
  

  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const fetchData = async () => {
      if (currentWorkitem) {
        if (currentWorkitem.id !== null)
          await dispatch(getTasks(currentWorkitem.id));
      }
    };
    fetchData();
  }, [currentWorkitem]);

  const handleEditClick = (task: Task) => {
    dispatch(changeTask(task)).then(() => {
      dispatch(openModal({ modalType: "TaskEditModal", modalProps: {id:task.id} }));
    });
  };

  const handleRemove = (task: Task) => {
    Modal.confirm({
      title: "Do you want to remove this task?",
      content: "Once removed, the task cannot be recovered.",
      async onOk() {
        if (task.id !== null && task.id !== undefined) {
          await dispatch(deleteTask({ id: task.id }));
        }
      },
      onCancel() {
        // Do nothing
      },
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


 

  if (!currentWorkitem || !currentWorkitem.tasks) {
    return (
    <div>
      <Divider></Divider>
      <strong>This project does not have any task</strong>
    </div>)
  }
  return(
    <div>
      <Divider></Divider>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Typography.Title style={{ fontSize: "30px" }}>
        Task List
      </Typography.Title>
      </div>
      <Collapse>
        {currentWorkitem.tasks.map( 
          (task, index) =>
            task ? ( // Check if task is not undefined
              <Panel
                header={
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography.Text strong>{task.name}</Typography.Text>
                    <div>
                      <Button
                        style={{ marginRight: "7px", color: "blue" }}
                        onClick={() => handleEditClick(task)}
                        icon={<EditOutlined />}
                      />
                      <Button
                        danger
                        onClick={() => handleRemove(task)}
                        icon={<DeleteOutlined />}
                      />
                    </div>
                  </div>
                }
                key={task.id?.toString() || index.toString()} // Fallback to index if id is not available
              >
                <p>Description : {task.description||""}</p>
                <p>Hours Expected: {task.hoursExpected||""}</p>
                <p>Hours Actual: {task.hoursActual || ""}</p>
                <p>Assign To: {task.assignTo || ""}</p>
                <p>Due Date: {dateConverter(task.dueDate) || ""}</p>
                <p>Expected Date: {dateConverter(task.expectedDate) || ""}</p>
                <p>Actual Date: {dateConverter(task.actualDate) || ""}</p>
                <p>Status: {task.status || ""}</p>
                <p>Type: {task.type || ""}</p>
                <p>Category: {task.category || ""}</p>
                <div>WorkitemId: {task.workitemId ? task.workitemId : "N/A"}</div>
              </Panel>
            ) : null // Skip rendering if task is undefined
        )}
      </Collapse>
    </div>
  );
};

export default TaskList;
