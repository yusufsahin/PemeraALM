import React from 'react';

import NoteNew from './NoteNew';
import ModalWrapper from '../modal/ModalWrapper';
import { Note } from '../../app/models/Note';

interface NoteNewModalProps {
  // Add any props that your component might receive here
}

const NoteNewModal: React.FC<NoteNewModalProps> = (props) => {
  
  return (
    <ModalWrapper size="lg" header="Note New">
      <NoteNew />
    </ModalWrapper>
  );
};

export default NoteNewModal;
