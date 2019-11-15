import React from "react";

import { Col, Icon, Layout, Row, Typography } from "antd";
import Text from "uniforms-antd/TextField";

const Footer = () => {
  const { Footer } = Layout;
  const { Title, Text } = Typography;

  return (
    <Footer>
      <div className="footer-container">
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Title level={4}>Resources</Title>
            <a href="/about"><Text>About</Text></a>
            <br/>
            <a href="https://blog.brittle-pins.com" target="_blank"><Text>Blog</Text></a>
          </Col>

          <Col xs={24} sm={8}>
            <Title level={4}>Source code</Title>

            <Icon type="android" />
            <a href="https://github.com/ekaterina-nikonova/brittle-pins-android" target="_blank" rel="noopener noreferrer">
              <Text> Brittle Pins</Text>
            </a>
            <br/>

            <Icon type="android" />
            <a href="https://github.com/ekaterina-nikonova/brittle-up" target="_blank" rel="noopener noreferrer">
              <Text> Brittle Up</Text>
            </a>
            <br/>

            <Icon type="android" />
            <a href="https://github.com/ekaterina-nikonova/brittle-eye" target="_blank" rel="noopener noreferrer">
              <Text> Brittle Eye</Text>
            </a>
            <br/>

            <Icon type="global" />
            <a href="https://github.com/ekaterina-nikonova/brittle-pins-api" target="_blank" rel="noopener noreferrer">
              <Text> Brittle Pins API</Text>
            </a>
            <br/>

            <Icon type="global" />
            <a href="https://github.com/ekaterina-nikonova/brittle-pins-web" target="_blank" rel="noopener noreferrer">
              <Text> Brittle Pins web client</Text>
            </a>
          </Col>

          <Col xs={24} sm={8}>
            <Title level={4}>Mobile apps</Title>

            <a href='https://play.google.com/store/apps/developer?id=Ekaterina+Nikonova&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1' target="_blank" rel="noopener noreferrer">
              <img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/>
            </a>
          </Col>
        </Row>

        <div className="contacts-container">
          <a href="mailto:admin@brittle-pins.com">
            <Icon type="mail"/>
          </a>
          <a href="https://github.com/ekaterina-nikonova" target="_blank">
            <Icon type="github"/>
          </a>
          <a href="https://www.linkedin.com/in/ekaterinanikonova/" target="_blank">
            <Icon type="linkedin"/>
          </a>
        </div>

        <div className="copyright-container">
          <Text>© 2019 Ekaterina Nikonova</Text>
        </div>
      </div>
    </Footer>
  );
};

export default Footer;
