import React from "react";
import { Modal } from "antd";
import { ModalWrapperProps } from "./ModalWrapperProps";
import { closeModal } from "./modalSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  children,
  size,
  header,
}) => {
  const dispatch = useAppDispatch();
  const isOpened = useAppSelector((state) => state.modal.isOpened);

  return (

    <Modal
      open={isOpened}
      title={header}
      onCancel={() => {
        dispatch(closeModal());
      }}
      footer={null}
      destroyOnClose={true}
      width="80%"
      bodyStyle={customModalStyle}
      style={{ top: '10%' }}
    >
      {children}
    </Modal>

  );
};

export default ModalWrapper;

const customModalStyle = {
    height: '80vh',
    overflow: 'auto',
  };
