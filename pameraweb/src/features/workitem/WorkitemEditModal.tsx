import React from "react";
import ModalWrapper from "../modal/ModalWrapper";

import WorkitemEdit from "./WorkitemEdit";

interface WorkitemEditModalProps {
  id:number
}

const WorkitemEditModal: React.FC<WorkitemEditModalProps> = ({id}) => {
  return (
    <ModalWrapper size="lg" header={`Workitem Edit For Id: ${id}`}>
      <WorkitemEdit />
    </ModalWrapper>
  );
};

export default WorkitemEditModal;
