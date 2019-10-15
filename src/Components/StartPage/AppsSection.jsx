import React from "react";

import { Col, Divider, Row, Typography } from "antd";

import BrittlePinsAndroidScreenshot from "../../Assets/Images/brittle-pins-android-screenshot.png";
import BrittleUpAndroidScreenshot from "../../Assets/Images/brittle-up-android-screenshot.png";
import BrittleEyeAndroidScreenshot from "../../Assets/Images/brittle-eye-android-screenshot.png";

import AppsSectionCard from "./AppsSectionCard";

const AppsSection = () => {
  const { Paragraph, Title } = Typography;

  return (
    <div className="apps-section">
      <Divider>
        <Title level={2}>
          Mobile apps
        </Title>
      </Divider>

      <Paragraph>
        A few companion mobile apps for Brittle Pins are utilities that help you
        to manage your stash. Currently, they are only available for Android.
      </Paragraph>

      <Row gutter={32}>
        <Col span={8}>
          <AppsSectionCard
            image={BrittlePinsAndroidScreenshot}
            imgAlt="Screenshot of Brittle Pins Android client"
            title="Brittle Pins Android"
            text="Manage data for your hardware and projects"
            repoLink="https://github.com/ekaterina-nikonova/brittle-pins-android"
          />
        </Col>

        <Col span={8}>
          <AppsSectionCard
            image={BrittleUpAndroidScreenshot}
            imgAlt="Screenshot of Brittle Up for Android"
            title="Brittle Up Android"
            text="Collect training data for your image labelling models"
            link="https://play.google.com/store/apps/details?id=com.brittlepins.brittleup"
            repoLink="https://github.com/ekaterina-nikonova/brittle-up"
          />
        </Col>

        <Col span={8}>
          <AppsSectionCard
            image={BrittleEyeAndroidScreenshot}
            imgAlt="Screenshot of Brittle Eye for Android"
            title="Brittle Eye Android"
            text="Classify electronic components using image recognition"
            link="https://play.google.com/store/apps/details?id=com.brittlepins.brittleeye"
            repoLink="https://github.com/ekaterina-nikonova/brittle-eye"
          />
        </Col>
      </Row>
    </div>
  );
};

export default AppsSection;
