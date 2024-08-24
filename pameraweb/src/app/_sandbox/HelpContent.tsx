import React from "react";
import {  theme } from "antd";

const HelpContent: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <p>
      Content
    </p>
  );
};

export default HelpContent;