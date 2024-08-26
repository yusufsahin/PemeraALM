import React from 'react';
import ModalWrapper from '../modal/ModalWrapper';
import WorkitemNew from './WorkitemNew';

interface WorkitemNewModalProps {
  // Add any props that your component might receive here
}

const WorkitemNewModal: React.FC<WorkitemNewModalProps> = (props) => {
  
  return (
    <ModalWrapper size="lg" header="Workitem New">
      <WorkitemNew />
    </ModalWrapper>
  );
};

export default WorkitemNewModal;
