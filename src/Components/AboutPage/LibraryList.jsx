import React from "react";

import { List } from "antd";

const LibraryList = ({ datasource }) => {
  return (
    <List
      className="libraries-list"
      dataSource={datasource}
      header="Internals"
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            title={<a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>}
            description={item.description}
          />
        </List.Item>
      )}
    />
  );
};

export default LibraryList;
