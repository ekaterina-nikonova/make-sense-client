import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from "@apollo/react-hooks";

import { queries } from "../../Services/graphql";

import { message } from "antd";
import AutoForm from 'uniforms-antd/AutoForm';
import LongTextField from 'uniforms-antd/LongTextField';
import SimpleSchema from 'simpl-schema';
import TextField from 'uniforms-antd/TextField';

const BoardDescriptionForm = ({ board }) => {
  const [updateBoard] = useMutation(queries.updateBoard);

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
    updateBoard({ variables: { id: board.id, ...data } })
      .catch(err => message.error('Could not update board.'));
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
