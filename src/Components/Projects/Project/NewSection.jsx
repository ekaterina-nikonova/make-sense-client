import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { queries } from "../../../Services/graphql";

import { Alert, Button, Form, Icon, Input, message, Select } from "antd";
import * as prismLanguages from "react-syntax-highlighter/dist/cjs/languages/prism";

import MDPreview, { MDPreviewIcon } from "./MDPreview";

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

  const create = ({ paragraph, code, language }) => createSection(
    { variables: {
      projectId,
      chapterId: chapter.id,
      paragraph,
      code,
      language
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
  const [ paragraphText, setParagraphText ] = useState('');
  const [ previewShows, setPreviewShows ] = useState(false);

  const { getFieldDecorator, validateFields } = form;

  const { Item } = Form;
  const { TextArea } = Input;
  const { Option } = Select;

  const languages = Object.keys(prismLanguages);

  const togglePreview = () => setPreviewShows(!previewShows);

  const createSection = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        create({
          paragraph: values.paragraph,
          code: values.code,
          language: values.language
        });
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
            onChange={e => setParagraphText(e.target.value)}
          />
        )}
      </Item>

      <MDPreviewIcon openModal={togglePreview} />

      <MDPreview
        visible={previewShows}
        text={paragraphText}
        close={togglePreview}
      />

      <Item>
        { getFieldDecorator ('code')(
          <TextArea
            rows={5}
            placeholder="Code snippet"
            className="project-section-code"
          />
        )}
      </Item>

      <Item>
        { getFieldDecorator ('language')(
          <Select
            showSearch
            placeholder="Select a language"
            className="project-section-code"
          >
            { languages.map(lang => (
              <Option key={lang} value={lang}>{ lang }</Option>
            )) }
          </Select>
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

export default NewSection;
