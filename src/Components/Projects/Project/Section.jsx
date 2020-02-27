import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import SimpleSchema from "simpl-schema";

import ReactMarkdown from "react-markdown";
import * as prismLanguages from "react-syntax-highlighter/dist/cjs/languages/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { deleteUpload } from "../../../Services/api";
import getUploadProps from "../../../Services/getUploadProps";
import { queries } from "../../../Services/graphql";

import { Button, Icon, message, Popconfirm, Tag, Upload } from "antd";
import AutoForm from "uniforms-antd/AutoForm";
import LongTextField from "uniforms-antd/LongTextField";
import SelectField from "uniforms-antd/SelectField";

import MDPreview, { MDPreviewIcon } from "./MDPreview";

const Section = ({ projectId, chapterId, section }) => {
  const [fileList, updateFileList] = useState([]);
  const [ editParagraph, setEditParagraph ] = useState(false);
  const [ editCode, setEditCode ] = useState(false);
  const [ previewShows, setPreviewShows ] = useState(false);
  const [ updateSection ] = useMutation(queries.updateSection);

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

  const handleDelete = () => deleteSection({
    variables: { projectId, chapterId, sectionId: section.id }
  }).then(res => message.success('Section deleted.'))
    .catch(err => message.error('Could not delete the section.'));

  const deleteImage = async () => {
    await deleteUpload({
      parent: 'section',
      parent_id: section.id,
      type: 'image'
    }).then(res => {
      updateSection({
        variables: {
          projectId,
          chapterId,
          sectionId: section.id,
          imageUrl: ''
        }
      });
      updateFileList([]);
      message.success('Image deleted.')
    }).catch(err => message.error('Could not delete the image.'));
  };

  const paragraphModel = ({
    paragraph: section.paragraph || ''
  });

  const codeModel = ({
    code: section.code || ''
  });

  const paragraphSchema = new SimpleSchema(
    { paragraph: String },
    { requiredByDefault: true }
  );

  const codeSchema = new SimpleSchema(
    { code: String, language: String },
    { requiredByDefault: false }
  );

  const languages = Object.keys(prismLanguages).map(l => ({ label: l, value: l }));

  const toggleEditParagraph = () => setEditParagraph(!editParagraph);
  const toggleEditCode = () => setEditCode(!editCode);
  const togglePreview = () => setPreviewShows(!previewShows)

  const updateParagraph = data => updateSection({
    variables: {
      projectId,
      chapterId,
      sectionId: section.id,
      paragraph: data.paragraph
    }
  });

  const updateCode = data => updateSection({
    variables: {
      projectId,
      chapterId,
      sectionId: section.id,
      code: data.code,
      language: data.language
    }
  });

  const uploaderProps = getUploadProps({
    parent: 'section',
    parent_id: section.id,
    type: 'image',
    fileList,
    updateFileList,
    onSuccess: imageUrl =>
      updateSection({
        variables: {
          projectId,
          chapterId,
          sectionId: section.id,
          imageUrl
        }
      })
  });

  return (
    <div className="project-section">
      <Popconfirm
        placement="bottomRight"
        title="Delete the section?"
        onConfirm={handleDelete}
      >
        <Icon
          type="close"
          className="section-delete-icon"
        />
      </Popconfirm>

      { section.imageUrl && (
        <div className="icons-show-on-hover">
          <Upload { ...uploaderProps }>
            <Icon type="picture" />
          </Upload>

          <Popconfirm title="Delete the image?" onConfirm={deleteImage}>
            <Icon
              type="close-circle"
              theme="twoTone"
              className="delete-image-icon"
            />
          </Popconfirm>

          <img
            alt="illustration for the section"
            src={section.imageUrl}
          />
        </div>
      )}

      { !section.imageUrl && (
        <Upload {...uploaderProps}>
          <Button shape="circle" icon="picture" />
        </Upload>
      ) }

      { !editParagraph && (
        <div className="icons-show-on-hover">
          <Icon
            type="edit"
            onClick={toggleEditParagraph}
          />
          <ReactMarkdown
            source={section.paragraph}
            editable={{ onChange: updateParagraph }}
          />
        </div>
      ) }

      { editParagraph && (
        <AutoForm
          autosave
          autosaveDelay={800}
          label={false}
          model={paragraphModel}
          onSubmit={updateParagraph}
          schema={paragraphSchema}
        >
          <Icon type="check" onClick={toggleEditParagraph}/>

          <LongTextField name="paragraph"/>

          <MDPreviewIcon openModal={togglePreview} />

          <MDPreview
            visible={previewShows}
            text={section.paragraph}
            close={togglePreview}
          />
        </AutoForm>
      ) }

      { !editCode && section.code && (
        <div className="icons-show-on-hover">
          <SyntaxHighlighter
            language={section.language || 'text'}
            style={atomDark}
            wrapLines
          >
            { section.code }
          </SyntaxHighlighter>

          <Icon
            type="edit"
            onClick={toggleEditCode}
          />

          <Tag style={{ float: 'right' }}>
            { section.language || 'Language not specified' }
          </Tag>
        </div>
      ) }

      { !editCode && !section.code && (
        <Icon type="code" onClick={toggleEditCode} />
      ) }

      { editCode && (
        <AutoForm
          autosave
          autosaveDelay={800}
          label={false}
          model={codeModel}
          onSubmit={updateCode}
          schema={codeSchema}
        >
          <LongTextField
            name="code"
            rows={10}
            style={{ maxHeight: '50vh' }}
          />

          <SelectField
            options={languages}
            value={section.language}
            placeholder="Select a language"
            name="language"
          />
          <Icon type="check" onClick={toggleEditCode} />
        </AutoForm>
      ) }
    </div>
  );
};

export default Section;
