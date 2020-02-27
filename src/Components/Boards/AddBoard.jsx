import React, { useState } from 'react';
import { useMutation } from "@apollo/react-hooks";

import { baseUrl } from '../../Services/api';
import { queries } from "../../Services/graphql";

import { Button, Collapse, Icon, Menu, message, Steps, Upload } from 'antd';

import AutoForm from 'uniforms-antd/AutoForm';
import LongTextField from 'uniforms-antd/LongTextField';
import SimpleSchema from 'simpl-schema';
import TextField from 'uniforms-antd/TextField';

import ComponentsContainer from "./Components/ComponentsContainer";

const AddBoard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [newBoardId, setNewBoardId] = useState('');

  const [createBoard] = useMutation(queries.createBoard);
  const [updateBoard] = useMutation(queries.updateBoard);

  const Dragger = Upload.Dragger;
  const Panel = Collapse.Panel;
  const Step = Steps.Step;

  const schema = new SimpleSchema({
    name: String,
    description: String
  });

  const NameDescriptionForm = () => {
    return (
      <AutoForm
        onSubmit={handleCreateBoard}
        schema={schema}
      >
        <TextField name="name" />
        <LongTextField name="description" />
        <Button type="primary" htmlType="submit" className="button-right">
          <span>Next</span>
          <Icon type="arrow-right" />
        </Button>
      </AutoForm>
    );
  };

  const ImageUpload = () => {
    const props = {
      action: `${baseUrl}/api/v1/uploads`,
      headers: {
        'X-CSRF-TOKEN': localStorage.csrf
      },
      withCredentials: true,
      data: { parent: 'board', parent_id: newBoardId, type: 'image' },
      name: 'file',
      onChange(info) {
        if (info.file.status === 'done') {
          const imageUrl = info.file.response.data.url;
          updateBoard({ variables: { id: newBoardId, imageUrl } })
            .then(res => {
              message.success(`File ${info.file.name} uploaded.`);
            }).catch(err => message.error('Could not update board.'))
        }

        if (info.file.status === 'error') {
          message.error(`Could not upload file ${info.file.name}`);
        }
      }
    };

    return (
      <React.Fragment>
        <Dragger {...props} className="board-image-upload">
          <p className="ant-upload-drag-icon">
            <Icon type="cloud-upload" />
          </p>
          <p className="ant-upload-text">Click or drag and drop an image file to upload</p>
          <p className="ant-upload-hint">Only JPG, JPEG, and PNG formats are supported.</p>
        </Dragger>
        <Button type="primary" onClick={moveToNextStep} className="button-right">
          <span>Next</span>
          <Icon type="arrow-right" />
        </Button>
      </React.Fragment>
    );
  };

  const resetAndClose = () => {
    setCurrentStep(0);
    setNewBoardId('');
  };

  const steps = [{
    content: <NameDescriptionForm />,
    icon: 'info-circle',
    title: 'Info'
  }, {
    content: <ImageUpload />,
    icon: 'picture',
    title: 'Image'
  }, {
    content: (
      <div>
        <ComponentsContainer boardId={newBoardId} />
        <Button type="primary" onClick={resetAndClose} className="button-right">
          <span>Done</span>
          <Icon type="check" />
        </Button>
      </div>
    ),
    icon: 'bars',
    title: 'Components'
  }];

  const moveToNextStep = () => setCurrentStep(currentStep + 1);

  const handleCreateBoard = data => {
    createBoard({ variables: {
        name: data.name,
        description: data.description
    } }).then(res => {
      setNewBoardId(res.data.createBoard.board.id);
      moveToNextStep();
    }).catch(err => message.error(`Could not create a board. ${err}`));
  };

  return (
    <Menu mode="horizontal">
      <Collapse bordered={false}>
        <Panel header="Add new board" key="addBoardPanel">
          <Steps current={currentStep}>
            {steps.map(step =>
              <Step
                icon={<Icon type={step.icon} />}
                key={step.title}
                title={step.title}
              />
            )}
          </Steps>
          {steps[currentStep].content}
        </Panel>
      </Collapse>
    </Menu>
  );
};

export default AddBoard;
