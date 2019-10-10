import React from "react";

import { Icon, Tooltip, Typography } from "antd";

import InvitationRequestForm from "./InvitationRequestForm";

const HeroSection = () => {
  const { Title, Paragraph } = Typography;

  return (
    <Typography className="hero-section">
      <Title>Keep 'em pins in order</Title>
      <Paragraph className="subtitle">
        To sign up, you'll need an invitation code.
        <Tooltip
          title="The service is working in a closed testing mode, and is not yet open for the general public."
        >
          <Icon type="info-circle" style={{ paddingLeft: "1rem" }} />
        </Tooltip>
      </Paragraph>
      <InvitationRequestForm />
    </Typography>
  );
};

export default HeroSection;
