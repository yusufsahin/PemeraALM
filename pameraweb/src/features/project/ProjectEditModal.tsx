import React from 'react';
import ModalWrapper from '../modal/ModalWrapper';

import ProjectEdit from './ProjectEdit';

interface ProjectEditModalProps {
 id:number
}

const ProjectEditModal: React.FC<ProjectEditModalProps> = ({id}) => {
  
  return (
    <ModalWrapper size="lg" header={`Project Edit For Id: ${id}`}>
      <ProjectEdit />
    </ModalWrapper>
  );
};

export default ProjectEditModal;
