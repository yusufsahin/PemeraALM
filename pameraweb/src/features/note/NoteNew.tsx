import React from 'react';

import { useForm } from 'react-hook-form';
import { Note } from '../../app/models/Note';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '../../app/store/configureStore';
import { saveNote } from './noteSlice';
import { closeModal } from '../modal/modalSlice';
import NoteForm from './NoteForm'


const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().nullable(),
  memo: yup.string().nullable(),
});

const NoteNew: React.FC = () => {
  const initialNote: Note = {
    name: "",
    description: "",
    memo: "",
  };

  const { handleSubmit, control, reset, formState: { errors } } = useForm<Note>({
    defaultValues: initialNote,
    resolver: yupResolver(schema) as any,
  });

  const dispatch = useAppDispatch();

  const onSubmit = (data: Note) => {
    if (!data.description) {
      data.description = null;
    }
    if (!data.memo) {
      data.memo = null;
    }
    dispatch(saveNote(data))
      .then(() => {
        reset(initialNote);
        dispatch(closeModal());
      })
      .catch((error) => {
        console.error("Failed to save the note:", error);
      });
  };

  return <NoteForm initialValues={initialNote} onSubmit={onSubmit} schema={schema} />;

};

export default NoteNew;
