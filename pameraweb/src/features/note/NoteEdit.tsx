import React, { useEffect } from "react";
import { Form, Button, Spin } from "antd";
import { useForm } from "react-hook-form";
import { Note } from "../../app/models/Note";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { getNotes, updateNote } from "./noteSlice";
import { closeModal } from "../modal/modalSlice";
import NoteForm from './NoteForm'

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string(),
  memo: yup.string(),
});

const NoteEdit: React.FC = () => {
  const currentNote = useAppSelector((state) => state.note.currentNote);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Note>({
    defaultValues: currentNote, // Use currentNote as the initial values
    resolver: yupResolver(schema) as any,
  });
  useEffect(() => {
    let defaults = {
      id: currentNote.id,
      name: currentNote.name,
      description: currentNote.description,
      memo: currentNote.memo,
    };
    reset(defaults);
  }, [currentNote, reset]);

  const dispatch = useAppDispatch();

  const onSubmit = async (data: Note) => {
    if (!data.description) {
      data.description = null;
    }
    if (!data.memo) {
      data.memo = null;
    }
    await dispatch(updateNote(data))
      .then(() => {
        dispatch(closeModal());
      })
      .then(async () => {
        await dispatch(getNotes());
      })
      .catch((error) => {
        console.error("Failed to save the note:", error);
      });
  };
  if (!currentNote) {
    return <Spin tip="Loading..."/>;
  }
  return (
    <NoteForm initialValues={currentNote} onSubmit={onSubmit} schema={schema} />
  );
};

export default NoteEdit;
