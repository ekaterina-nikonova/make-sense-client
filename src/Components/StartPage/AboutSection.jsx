import React from "react";

import { Col, Divider, Row, Typography } from "antd";

import aboutLogo from "../../Assets/Icons/icon-about-round.png";
import blogLogo from "../../Assets/Icons/icon-blog-round.png";

import AboutSectionCard from "./AboutSectionCard";

const AboutSection = () => {
  const { Paragraph, Title } = Typography;
  return (
    <div className="about-section">
      <Divider>
        <Title level={2}>
          About Brittle Pins
        </Title>
      </Divider>

      <Paragraph>
        Here's one place to keep track of all your hobby projects,
        all the code that you've written, and all the hardware
        that you already have or just planning to lay your hands on.
      </Paragraph>

      <Row gutter={16}>
        <Col span={12}>
          <AboutSectionCard
            image={aboutLogo}
            link="/about"
            target="_self"
            title="Nuts and bolts"
            text="This web client is a React app on top of an API
              built with Ruby on Rails. Here you can learn more about tools
              and technologies behind Brittle Pins."
          />
        </Col>

        <Col span={12}>
          <AboutSectionCard
            image={blogLogo}
            link="https://blog.brittle-pins.com"
            target="_blank"
            title="Brittle scribbles"
            text="The blog is devoted to various technologies and tools that
              are new and interesting, whether they have been used in Brittle Pins
              or not."
          />
        </Col>
      </Row>
    </div>
  );
};

export default AboutSection;
