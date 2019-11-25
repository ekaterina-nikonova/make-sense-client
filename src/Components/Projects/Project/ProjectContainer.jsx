import React, { useState } from "react";

import { Button, Empty, Tabs } from "antd";

import ProjectHeader from "./ProjectHeader";
import Chapter from "./Chapter";

const ProjectContainer = ({ project, board, chapters, history }) => {
  const [mobileScreen, setMobileScreen] = useState(window.innerWidth < 1000);

  const { TabPane } = Tabs;

  window.addEventListener(
    'resize',
    () => setMobileScreen(window.innerWidth < 1000)
  );

  return (
    <div className="project-container">
      <ProjectHeader
        history={history}
        project={project}
        board={board}
      />

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
    </div>
  );
};

export default ProjectContainer;
