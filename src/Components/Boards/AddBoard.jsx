import React from 'react';

import { createBoard } from '../../Services/api';

import { Button, Collapse, Icon } from 'antd';

import AutoForm from 'uniforms-antd/AutoForm';
import LongTextField from 'uniforms-antd/LongTextField';
import SimpleSchema from 'simpl-schema';
import TextField from 'uniforms-antd/TextField';

const AddBoard = () => {
  const Panel = Collapse.Panel;

  const schema = new SimpleSchema({
    name: String,
    description: String
  });

  let formRef;

  return (
    <Collapse bordered={false}>
      <Panel header="Add new board">
        <AutoForm
          onSubmit={data => {
            createBoard(data);
            formRef.reset();
          }}
          ref={ref => formRef = ref}
          schema={schema}
        >
          <TextField name="name" />
          <LongTextField name="description" />
          <Button type="primary" htmlType="submit">
            <Icon type="check" />
            <span>Save</span>
          </Button>
        </AutoForm>
      </Panel>
    </Collapse>
  );
};

export default AddBoard;
