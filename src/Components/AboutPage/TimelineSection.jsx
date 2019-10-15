import React from "react";
import PropTypes from "prop-types";

import { Icon, Timeline, Typography } from "antd";

import LibraryList from "./LibraryList";

const TimelineSection = ({ description, icon, libraries, subtitle, title }) => {
  const { Paragraph, Text, Title } = Typography;

  return (
    <Timeline.Item
      dot={<Icon component={icon} />}
    >
      <Title level={4}>{title}</Title>

      <div className="subtitle">
        <Text type="secondary">{subtitle}</Text>
      </div>

      <Paragraph>{description}</Paragraph>

      { libraries && <LibraryList datasource={libraries} /> }

    </Timeline.Item>
  );
};

TimelineSection.propTypes = {
  description: PropTypes.string,
  icon: PropTypes.object.isRequired,
  libraries: PropTypes.object,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired
};

export default TimelineSection;
