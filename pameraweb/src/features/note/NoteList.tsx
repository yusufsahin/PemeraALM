import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { getNotes, changeNote, deleteNote } from "./noteSlice";
import { Typography, List, Button, Collapse, Spin, Modal } from "antd";
import { openModal } from "../modal/modalSlice";
import { Note } from "../../app/models/Note";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import parse from "html-react-parser";

const { Panel } = Collapse;

const NoteList: React.FC = () => {
  const notes = useAppSelector((state) => state.note.notes);
  const loading = useAppSelector((state) => state.note.loading);
  const currentNote = useAppSelector((state) => state.note.currentNote);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getNotes());
    };
    fetchData();
  }, [currentNote]);

  const handleEditClick = (note: Note) => {
    dispatch(changeNote(note)).then(() => {
      dispatch(openModal({ modalType: "NoteEditModal", modalProps: {id:note.id} }));
    });
  };

  const handleRemove = (note: Note) => {
    if (note.id === null || note.id === undefined) {
      // Handle the error appropriately
      return;
    }

    dispatch(changeNote(note));
    Modal.confirm({
      title: "Do you want to remove this note?",
      content: "Once removed, the note cannot be recovered.",
      async onOk() {
        await dispatch(deleteNote({ id: note.id! }));
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
          dispatch(openModal({ modalType: "NoteNewModal", modalProps: {} }))
        }
      />
      <Typography.Title style={{ fontSize: "30px" }}>
        Note List
      </Typography.Title>
      <Collapse>
        {notes.map((note) => {
          if (note.id == null) {
            return null;
          }
          return (
            <Panel
              header={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography.Text strong>{note.name}</Typography.Text>
                  <div>
                    <Button
                      style={{ marginRight: 8 }}
                      onClick={() => handleEditClick(note)}
                      icon={<EditOutlined />}
                    />
                    <Button
                      danger
                      onClick={() => handleRemove(note)}
                      icon={<DeleteOutlined />}
                    />
                  </div>
                </div>
              }
              key={note.id}
            >
              <p>
              Description: {note.description ? note.description : "N/A"}
              </p>
              <div>
              Memo: {note.memo ? parse(note.memo) : "N/A"}
              </div>
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
};

export default NoteList;
