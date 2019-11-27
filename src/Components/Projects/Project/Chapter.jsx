import React, { useState } from "react";
import { Alert, Button, Form, Icon, Input, Tooltip, Typography } from "antd";

const Chapter = ({ chapter }) => {
  const [ newSectionShows, setNewSectionShows ] = useState(false);

  const { Paragraph, Title } = Typography;

  const toggleNewSection = () => setNewSectionShows(!newSectionShows);

  return (
    <React.Fragment>
      <Title level={4}>{ chapter.name }</Title>
      <Paragraph>{ chapter.intro }</Paragraph>

      { chapter.sections && chapter.sections.map(section => (
      <Section key={section.id} section={section} />
      ))}


      { !newSectionShows && (
        <Tooltip title="Add a section">
          <Button shape="circle" icon="plus" onClick={toggleNewSection} />
        </Tooltip>
      ) }

      { newSectionShows && (
        <NewSection cancel={toggleNewSection} chapterId={chapter.id} />
      ) }
    </React.Fragment>
  );
};

const Section = ({ section }) => {
  const { Paragraph } = Typography;

  return (
    <div className="project-section">
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

const NewSection = ({ cancel, chapterId }) => {
  const createSection = () => chapterId;

  return (
    <div className="project-section">
      <WrappedForm create={createSection} cancel={cancel} />
    </div>
  );
};

const NewSectionForm = ({ cancel, create, form }) => {
  const [ error, setError ] = useState(false);
  const [ description, setDescription ] = useState('');
  const [ code, setCode ] = useState('');

  const { getFieldDecorator, validateFields } = form;

  const { Item } = Form;
  const { TextArea } = Input;

  const createSection = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        // createSection mutation
      }
    })
  };

  return (
    <Form onSubmit={createSection}>
      {!error && (
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
            onChange={setDescription}
          />
        )}
      </Item>

      <Item>
        <TextArea
          rows={5}
          placeholder="Code snippet"
          onChange={setCode}
          className="project-section-code"
        />
      </Item>

      <Button onClick={cancel}>Cancel</Button>
      <Button type="primary" htmlType="submit">Save</Button>
    </Form>
  );
};

const WrappedForm = Form.create({ name: 'new_section_form '})(NewSectionForm);

export default Chapter;
