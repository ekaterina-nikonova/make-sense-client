import React, { useEffect, useState } from "react";
import {useMutation, useQuery} from "@apollo/react-hooks";

import { queries } from "../../../Services/graphql";

import { Button, Empty, Icon, Input, Popconfirm, Tabs, Typography, message } from "antd";

import Chapter from "./Chapter";

const ChaptersContainer = ({ projectId }) => {
  const [ mobileScreen, setMobileScreen ] = useState(window.innerWidth < 1000);
  const [ newChapterEdit, setNewChapterEdit ] = useState(false);
  const [ newChapterTitle, setNewChapterTitle ] = useState('');
  const [ newChapterIntro, setNewChapterIntro ] = useState('');
  const [ activeTab, setActiveTab ] = useState();
  const [ previousActiveTab, setPreviousActiveTab ] = useState();
  const [ newTabShows, setNewTabShows ] = useState();

  const { loading, error, data } = useQuery(
    queries.chapters,
    { variables: { projectId } }
  );

  useEffect(() => {
    if (data && data.chapters && data.chapters.length) {
      setActiveTab(data.chapters[0].id)
    }
  }, [projectId]);

  window.addEventListener(
    'resize',
    () => setMobileScreen(window.innerWidth < 1000)
  );

  const [ createChapter ] = useMutation(
    queries.createChapter,
    { update(cache, { data: { createChapter }}) {
      const { chapter } = createChapter;
      const { chapters } = cache.readQuery({
        query: queries.chapters, variables: { projectId }
      });

      cache.writeQuery({
        query: queries.chapters,
        variables: { projectId },
        data: { chapters: chapters.concat([chapter]) }
      })
    } }
  );

  const [ deleteChapter ] = useMutation(
    queries.deleteChapter,
    { update(cache, { data: { deleteChapter }}) {
      const { chapter } = deleteChapter;
      const { chapters } = cache.readQuery({
        query: queries.chapters, variables: { projectId }
      });

      cache.writeQuery({
        query: queries.chapters,
        variables: { projectId },
        data: { chapters: chapters.filter(ch => ch.id !== chapter.id) }
      });
    } }
  );

  const { TabPane } = Tabs;

  const toggleFirstChapterEdit = () =>
    setNewChapterEdit(!newChapterEdit);

  const createFirstChapter = () => createChapter({
    variables: {
      projectId,
      name: newChapterTitle,
      intro: newChapterIntro
    }
  }).then(res => {
    message.success('Chapter created.');
    setNewChapterTitle('');
    setNewChapterIntro('');
    if (!newChapterEdit) toggleNewTab();
    toggleFirstChapterEdit();
    changeActiveTab(res.data.createChapter.chapter.id);
  }).catch(err => message.error('Could not create a chapter.'));

  const toggleNewTab = () => {
    setNewTabShows(!newTabShows);
    if (!newTabShows) {
      changeActiveTab('newTab');
    } else if (activeTab === 'newTab') {
      changeActiveTab(previousActiveTab);
    }
  };

  const changeActiveTab = tab => {
    setPreviousActiveTab(activeTab);
    setActiveTab(tab);
  };

  const handleDelete = chapterId => {
    deleteChapter({ variables: { projectId, chapterId }})
      .then(res => {
        changeActiveTab(previousActiveTab);
        message.success('Chapter deleted.')
      })
      .catch(err => message.error('Could not delete the chapter.'))
  };

  return (
    <React.Fragment>
      {(!data || !data.chapters || !data.chapters.length) && !newChapterEdit && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={false}
        >
          <Button onClick={toggleFirstChapterEdit}>
            Add a chapter
          </Button>
        </Empty>
      )}

      {(!data || !data.chapters || !data.chapters.length) && newChapterEdit && (
        <NewChapterForm
          setTitle={setNewChapterTitle}
          setIntro={setNewChapterIntro}
          toggle={toggleFirstChapterEdit}
          create={createFirstChapter}
        />
      )}

      { data && data.chapters && !!data.chapters.length && (
        <Tabs
          activeKey={activeTab}
          onChange={changeActiveTab}
          tabPosition={ mobileScreen ? "top" : "left" }
          tabBarExtraContent={
            <Icon
              type="plus-circle"
              className="add-chapter-icon"
              onClick={toggleNewTab}
            />
          }
        >
          {data.chapters.map(chapter => (
            <TabPane
              key={chapter.id}
              tab={
                <span className="icons-show-on-hover">
                  <Popconfirm
                    title={`Delete chapter ${chapter.name}?`}
                    onConfirm={() => handleDelete(chapter.id)}
                  >
                    <Icon className="icon-show-on-hover" type="close" />
                  </Popconfirm>  { chapter.name }
                </span>
              }
              className="chapter-tab-pane"
            >
              <Chapter chapter={chapter} />
            </TabPane>
          ))}

          { newTabShows &&
            <TabPane key="newTab" tab="New chapter">
              <NewChapterForm
                setTitle={setNewChapterTitle}
                setIntro={setNewChapterIntro}
                toggle={toggleNewTab}
                create={createFirstChapter}
              />
            </TabPane>
          }
        </Tabs>
      )}
    </React.Fragment>
  );
};

const NewChapterForm = ({ setTitle, setIntro, toggle, create }) => {
  const { Title } = Typography;
  const { TextArea } = Input;

  return (
    <div className="create-first-chapter-container">
      <Title level={4}>New chapter</Title>
      <Input
        placeholder="Title"
        onChange={e => setTitle(e.target.value)}
      />
      <TextArea
        rows={5}
        placeholder="Intro"
        onChange={e => setIntro(e.target.value)}
      />
      <div>
        <Button onClick={toggle}>
          Cancel
        </Button>

        <Button type="primary" onClick={create}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default ChaptersContainer;
