import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { queries } from "../../../Services/graphql";

import { Button, Tooltip, Typography } from "antd";

import Section from "./Section";
import NewSection from "./NewSection";

const Chapter = ({ chapter }) => {
  const [ newSectionShows, setNewSectionShows ] = useState(false);
  const [ updateChapter ] = useMutation(queries.updateChapter);

  const { Paragraph, Title } = Typography;

  const toggleNewSection = () => setNewSectionShows(!newSectionShows);

  const updateName = str => updateChapter({
    variables: {
      projectId: chapter.projectId,
      chapterId: chapter.id,
      name: str
    }
  });

  const updateIntro = str => updateChapter({
    variables: {
      projectId: chapter.projectId,
      chapterId: chapter.id,
      intro: str
    }
  });

  return (
    <React.Fragment>
      <Title level={4} editable={{ onChange: updateName }}>
        { chapter.name }
      </Title>

      <Paragraph editable={{ onChange: updateIntro }}>
        { chapter.intro }
      </Paragraph>

      { chapter.sections && chapter.sections.map(section => (
        <Section
          key={section.id}
          projectId={chapter.projectId}
          chapterId={chapter.id}
          section={section}
        />
      ))}

      { !newSectionShows && (
        <Tooltip title="Add a section">
          <Button shape="circle" icon="plus" onClick={toggleNewSection} />
        </Tooltip>
      ) }

      { newSectionShows && (
        <NewSection
          cancel={toggleNewSection}
          chapter={chapter}
          projectId={chapter.projectId}
        />
      ) }
    </React.Fragment>
  );
};

export default Chapter;
