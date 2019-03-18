import React from 'react';
import PropTypes from 'prop-types';

import { Col, Empty, Icon, Row } from 'antd';

const EmptyFullPage = ({ description }) => (
  <Row type="flex">
    <Col span={24} style={{ display: 'flex' }}>
      <Empty
        className="empty-full-page"
        description={description}
        image={
          <Icon type="tool" className="empty-icon" />
        }
      />
    </Col>
  </Row>
);

EmptyFullPage.defaultProps = {
  description: 'It\'s empty here...'
};

EmptyFullPage.propTypes = {
  description: PropTypes.string
};

export default EmptyFullPage;
