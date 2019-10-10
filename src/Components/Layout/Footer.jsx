import React from "react";

import { Col, Icon, Layout, Row, Typography } from "antd";
import Text from "uniforms-antd/TextField";

const Footer = () => {
  const { Footer } = Layout;
  const { Title, Text } = Typography;

  return (
    <Footer>
      <div className="footer-container">
        <Row>
          <Col span={12}>
            <Title level={4}>Resources</Title>
            <a href="/about"><Text>About</Text></a>
            <br/>
            <a href="https://blog.brittle-pins.com" target="_blank"><Text>Blog</Text></a>
          </Col>

          <Col span={12}>
            <Title level={4}>Source code</Title>
            <a href="#"><Text>Brittle Pins</Text></a>
            <br/>
            <a href="#"><Text>Brittle Up</Text></a>
            <br/>
            <a href="#"><Text>Brittle Eye</Text></a>
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
