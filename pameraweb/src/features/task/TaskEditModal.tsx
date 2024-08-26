import React from 'react';
import ModalWrapper from '../modal/ModalWrapper';

import TaskEdit from './TaskEdit';

interface TaskEditModalProps {
  id:number
}

const TaskEditModal: React.FC<TaskEditModalProps> = ({id}) => {
  
  return (
    <ModalWrapper size="lg" header={`Task Edit For Id: ${id}`}>
      <TaskEdit />
    </ModalWrapper>
  );
};

export default TaskEditModal;
