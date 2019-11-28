import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { queries } from "../../../Services/graphql";

import { Alert, Button, Form, Icon, Input, Popconfirm, Tooltip, Typography, message } from "antd";

const Chapter = ({ chapter }) => {
  const [ newSectionShows, setNewSectionShows ] = useState(false);

  const { Paragraph, Title } = Typography;

  const toggleNewSection = () => setNewSectionShows(!newSectionShows);

  return (
    <React.Fragment>
      <Title level={4}>{ chapter.name }</Title>
      <Paragraph>{ chapter.intro }</Paragraph>

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

const Section = ({ projectId, chapterId, section }) => {
  const [ deleteSection ] = useMutation(
    queries.deleteSection,
    { update(cache, { data: { deleteSection } }) {
      const { section } = deleteSection;
      const { chapters } = cache.readQuery({
        query: queries.chapters, variables: { projectId }
      });

      const chapter = chapters.find(ch => ch.id === chapterId);

      cache.writeQuery({
        query: queries.chapters,
        variables: { id: projectId },
        data: { chapters: chapters.map(ch => {
          if (ch.id === chapterId) {
            return (
              { ...chapter,
                sections: chapter.sections.filter(s => s.id !== section.id)
              }
            );
          } else {
            return ch;
          }
        })}
      })
    }}
  );

  const { Paragraph } = Typography;

  const handleDelete = () => deleteSection({
    variables: { projectId, chapterId, sectionId: section.id }
  }).then(res => message.success('Section deleted.'))
    .catch(err => message.error('Could not delete the section.'));

  return (
    <div className="project-section">
      <Popconfirm title="Delete the section?" onConfirm={handleDelete}>
        <Icon
          type="close"
          className="section-delete-icon"
        />
      </Popconfirm>

      { section.image && (
        <img
          alt="illustration for the section"
          src={section.imageUrl}
          className="board-main-image"
        />
      )}
      <Paragraph>{ section.paragraph }</Paragraph>
      <Paragraph copyable className="project-section-code">
        { section.code }
      </Paragraph>
    </div>
  );
};

const NewSection = ({ cancel, chapter, projectId }) => {
  const [ createSection ] = useMutation(
    queries.createSection,
      { update(cache, { data: { createSection }}) {
      const { section } = createSection;
      const { chapters } = cache.readQuery({
        query: queries.chapters, variables: { projectId }
      });

      cache.writeQuery({
        query: queries.chapters,
        variables: { id: projectId },
        data: { chapters: chapters.map(ch => {
          if (ch.id === chapter.id) {
            return (
              {...chapter, sections: chapter.sections.concat([section])}
            );
          } else {
            return ch;
          }
        })}
      })
    } }
  );

  const create = ({ paragraph, code }) => createSection(
    { variables: {
      projectId,
      chapterId: chapter.id,
      paragraph,
      code
    }
  }).then(res => {
    message.success('Project saved.');
  });

  return (
    <div className="project-section">
      <WrappedForm create={create} cancel={cancel} />
    </div>
  );
};

const NewSectionForm = ({ cancel, create, form }) => {
  const [ error, setError ] = useState(false);

  const { getFieldDecorator, validateFields } = form;

  const { Item } = Form;
  const { TextArea } = Input;

  const createSection = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        create({ paragraph: values.paragraph, code: values.code });
        setError(false);
        form.resetFields();
      } else setError(true);
    })
  };

  return (
    <Form onSubmit={createSection}>
      {error && (
        <Item>
          <Alert
            type="error"
            message="Could not create a section"
            showIcon
            icon={<Icon type="close-circle" />}
          />
        </Item>
      )}

      <Item>
        { getFieldDecorator ('paragraph', {
          rules: [
            {
              required: true,
              whitespace: true,
              message: 'Please provide a description.'
            }
          ]
        })(
          <TextArea
            rows={5}
            placeholder="An intro, description or comment"
          />
        )}
      </Item>

      <Item>
        { getFieldDecorator ('code')(
          <TextArea
            rows={5}
            placeholder="Code snippet"
            className="project-section-code"
          />
        )}
      </Item>

      <div className="new-section-form-buttons">
        <Button onClick={cancel}>Cancel</Button>
        <Button type="primary" htmlType="submit">Save</Button>
      </div>
    </Form>
  );
};

const WrappedForm = Form.create({ name: 'new_section_form '})(NewSectionForm);

export default Chapter;
