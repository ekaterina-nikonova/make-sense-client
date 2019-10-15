import React from "react";
import PropTypes from "prop-types";

import { Icon, Timeline, Typography } from "antd";

import LibraryList from "./LibraryList";

const TimelineSection = ({ description, icon, libraries, repoLink, subtitle, title }) => {
  const { Paragraph, Text, Title } = Typography;

  return (
    <Timeline.Item
      dot={<Icon component={icon} />}
    >
      <a href={repoLink} target="_blank" rel="noopener noreferrer">
        <Title level={4}>
          {title}
          <Icon
            type="export"
            style={{ color: '#71a4ea', fontSize: '.8rem', marginLeft: '1rem', verticalAlign: 'super' }}
          />
        </Title>
      </a>

      <div className="subtitle">
        <Text type="secondary">{subtitle}</Text>
      </div>

      <Paragraph>{description}</Paragraph>

      { libraries.length ? <LibraryList datasource={libraries} /> : null }

    </Timeline.Item>
  );
};

TimelineSection.propTypes = {
  description: PropTypes.object,
  icon: PropTypes.func.isRequired,
  libraries: PropTypes.arrayOf(PropTypes.object),
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired
};

export default TimelineSection;
