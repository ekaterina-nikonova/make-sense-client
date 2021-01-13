import React from 'react';
import PropTypes from 'prop-types';

import { Col, Empty, Icon, Row } from 'antd';

const EmptyFullPage = ({ description, icon }) => (
  <Row type="flex">
    <Col span={24} style={{ display: 'flex' }}>
      <Empty
        className="empty-full-page"
        description={description}
        image={
          <Icon type={icon} className="empty-icon" />
        }
      />
    </Col>
  </Row>
);

EmptyFullPage.defaultProps = {
  description: 'No data',
  icon: 'inbox'
};

EmptyFullPage.propTypes = {
  description: PropTypes.string,
  icon: PropTypes.string
};

export default EmptyFullPage;
