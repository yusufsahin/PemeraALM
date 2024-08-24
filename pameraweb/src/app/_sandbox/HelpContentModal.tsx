import React from "react";
import {  theme } from "antd";
import ModalWrapper from "../../features/modal/ModalWrapper";
import HelpContent from "./HelpContent";

const HelpContentModal: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <ModalWrapper size="md" header="Help">
        <HelpContent/>    
    </ModalWrapper>
  );
};

export default HelpContentModal;