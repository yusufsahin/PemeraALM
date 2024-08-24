import React from "react";
import { useAppSelector,useAppDispatch } from "../../app/store/configureStore";
import HelpContentModal from "../../app/_sandbox/HelpContentModal";
import NoteNewModal from "../note/NoteNewModal";
import NoteEditModal from "../note/NoteEditModal";
import ProjectEditModal from "../project/ProjectEditModal";
import ProjectNewModal from "../project/ProjectNewModal";




interface ModalLookup {
  [modalType: string]: React.ComponentType<any> | undefined; // Adjust "any" to match the expected props
}

const ModalManager: React.FC = () => {
  const modalLookup: ModalLookup = {
    HelpContentModal,
    NoteNewModal,
    NoteEditModal,
    ProjectEditModal,
    ProjectNewModal,
    

  };

  const currentModal = useAppSelector(state => state.modal); // Adjust RootState type
  let renderedModal: React.ReactNode | null = null;

  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];

    if (ModalComponent) {
      renderedModal = <ModalComponent {...modalProps} />;
    }
  }

  return renderedModal;
};

export default ModalManager;
