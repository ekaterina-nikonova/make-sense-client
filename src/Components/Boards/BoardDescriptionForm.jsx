import React, { useDispatch } from 'reactn';
import PropTypes from 'prop-types';

import { updateBoard } from '../../Services/api';

import AutoForm from 'uniforms-antd/AutoForm';
import LongTextField from 'uniforms-antd/LongTextField';
import SimpleSchema from 'simpl-schema';
import TextField from 'uniforms-antd/TextField';

const BoardDescriptionForm = ({ board }) => {
  const dispatchUpdate = useDispatch('boardReducer');

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

  const update = data => {
    const updatedBoard = { ...board, ...data };
    const action = { action: 'update', data: updatedBoard };
    updateBoard({ boardId: board.id, updates: data })
      .then(response => dispatchUpdate(action));
  };

  return (
    <AutoForm
      autosave
      autosaveDelay={800}
      model={model}
      onSubmit={update}
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
