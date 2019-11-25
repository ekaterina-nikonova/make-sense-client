import React from "react";

import { Button, Empty, Tabs } from "antd";

import Chapter from "./Chapter";

const ChaptersContainer = ({ chapters, mobileScreen }) => {
  const { TabPane } = Tabs;

  return (
    <React.Fragment>
      {(!chapters || chapters.length === 0) && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={false}
        >
          <Button>Add a chapter</Button>
        </Empty>
      )}

      { chapters && (
        <Tabs
          defaultActiveKey="1"
          tabPosition={ mobileScreen ? "top" : "left" }
        >
          {chapters.map(chapter => (
            <TabPane key={chapter.id} tab={chapter.name}>
              <Chapter chapter={chapter} />
            </TabPane>
          ))}
        </Tabs>
      )}
    </React.Fragment>
  );
};

export default ChaptersContainer;
