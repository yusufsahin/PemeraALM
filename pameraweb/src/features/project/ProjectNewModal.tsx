import React from 'react';

import ProjectNew from './ProjectNew';
import ModalWrapper from '../modal/ModalWrapper';
import { Note } from '../../app/models/Note';

interface ProjectNewModalProps {
  // Add any props that your component might receive here
}

const ProjectNewModal: React.FC<ProjectNewModalProps> = (props) => {
  
  return (
    <ModalWrapper size="lg" header="Project New">
      <ProjectNew />
    </ModalWrapper>
  );
};

export default ProjectNewModal;
