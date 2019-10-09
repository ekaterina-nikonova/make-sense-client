import React from "react";

import { Typography } from "antd";

import InvitationRequestForm from "./InvitationRequestForm";

const HeroSection = () => {
  const { Title, Paragraph } = Typography;

  return (
    <Typography className="hero-section">
      <Title>Keep 'em pins in order</Title>
      <Paragraph className="subtitle">
        To sign up, you'll need an invitation code.
      </Paragraph>
      <InvitationRequestForm />
    </Typography>
  );
};

export default HeroSection;
