import React, { useState } from "react";

import { Button, Empty, Input, Tabs, Typography } from "antd";

import Chapter from "./Chapter";

const ChaptersContainer = ({ chapters, mobileScreen }) => {
  const [ firstChapterEdit, setFirstChapterEdit ] = useState(false);
  const [ firstChapterTitle, setFirstChapterTitle ] = useState('');
  const [ firstChapterIntro, setFirstChapterIntro ] = useState('');

  const { TextArea } = Input;
  const { TabPane } = Tabs;
  const { Title } = Typography;

  const toggleFirstChapterEdit = () =>
    setFirstChapterEdit(!firstChapterEdit);

  const createFirstChapter = () => {};

  return (
    <React.Fragment>
      {(!chapters || !chapters.length) && !firstChapterEdit && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={false}
        >
          <Button onClick={toggleFirstChapterEdit}>
            Add a chapter
          </Button>
        </Empty>
      )}

      {(!chapters || !chapters.length) && firstChapterEdit && (
        <div className="create-first-chapter-container">
          <Title level={4}>New chapter</Title>
          <Input
            placeholder="Title"
            onChange={e => setFirstChapterTitle(e.target.value)}
          />
          <TextArea
            rows={5}
            placeholder="Intro"
            onChange={e => setFirstChapterIntro(e.target.value)}
          />
          <div>
            <Button onClick={toggleFirstChapterEdit}>
              Cancel
            </Button>

            <Button type="primary" onClick={createFirstChapter}>
              Save
            </Button>
          </div>
        </div>
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
