import React from 'react';
import ModalWrapper from '../modal/ModalWrapper';
import TaskNew from './TaskNew';

interface TaskNewModalProps {
  // Add any props that your component might receive here
}

const TaskNewModal: React.FC<TaskNewModalProps> = (props) => {
  
  return (
    <ModalWrapper size="lg" header="Task New">
      <TaskNew />
    </ModalWrapper>
  );
};

export default TaskNewModal;
