import React from "react";
import {  theme } from "antd";
import {Button} from "antd";
import { useAppDispatch } from "../store/configureStore";
import { openModal } from "../../features/modal/modalSlice";

const Help: React.FC = () => {

    const dispatch= useAppDispatch();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <p>
      Help
      <Button
          type="primary"
          onClick={() =>
            dispatch(openModal({ modalType: "HelpContentModal", modalProps: {} }))
          }
        >
         Open Help
        </Button>

    </p>
  );
};

export default Help;
