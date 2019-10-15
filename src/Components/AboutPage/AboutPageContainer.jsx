import React from "react";

import { Divider, Typography } from "antd";

const AboutPageContainer = () => {
  const { Paragraph, Title } = Typography;

  return (
    <div className="about-container">
      <div className="about-section">
        <Divider>
          <Title>About Brittle Pins</Title>
        </Divider>

        <Paragraph>
          This project is a playground where I experiment with technologies that catch my eye.
          It was conceived as an IoT project management app&nbsp;&mdash; a single place
          to keep track of your equipment and code.
        </Paragraph>

        <Paragraph>
          The core of Brittle Pins is an API built with <strong>Ruby on Rails</strong> and a web client built with <strong>React</strong>.
          The accompanying Android apps are written in <strong>Kotlin</strong>, but some older code is still in <strong>Java</strong>.
        </Paragraph>
      </div>
    </div>
  );
};

export default AboutPageContainer;
