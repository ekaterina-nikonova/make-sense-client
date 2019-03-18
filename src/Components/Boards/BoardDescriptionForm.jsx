import React from 'react';
import PropTypes from 'prop-types';

import { updateBoard } from '../../Services/api';

import AutoForm from 'uniforms-antd/AutoForm';
import LongTextField from 'uniforms-antd/LongTextField';
import SimpleSchema from 'simpl-schema';
import TextField from 'uniforms-antd/TextField';

const BoardDescriptionForm = ({ board }) => {
  const schema = new SimpleSchema({
    name: String,
    description: String
  },
    {
      requiredByDefault: false
    });

  const model = ({
    name: board.name || '',
    description: board.description || ''
  });

  return (
    <AutoForm
      autosave
      autosaveDelay={500}
      model={model}
      onSubmit={data => updateBoard({ boardId: board.id, updates: data })}
      schema={schema}
    >
      <TextField name="name" />
      <LongTextField name="description" />
    </AutoForm>
  );
};

BoardDescriptionForm.propTypes = {
  board: PropTypes.object.isRequired
};

export default BoardDescriptionForm;
