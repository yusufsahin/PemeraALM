import React from 'react';
import ModalWrapper from '../modal/ModalWrapper';
import { Note } from '../../app/models/Note';
import NoteEdit from './NoteEdit';

interface NoteEditModalProps {
 id:number
}

const NoteEditModal: React.FC<NoteEditModalProps> = ({id}) => {
  
  return (
    <ModalWrapper size="lg" header={`Note Edit For Id: ${id}`}>
      <NoteEdit />
    </ModalWrapper>
  );
};

export default NoteEditModal;
