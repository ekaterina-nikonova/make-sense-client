import React from 'react';
import PropTypes from 'prop-types';

import { updateComponent } from '../../Services/api';

import AutoForm from 'uniforms-antd/AutoForm';
import LongTextField from 'uniforms-antd/LongTextField';
import SimpleSchema from 'simpl-schema';
import TextField from 'uniforms-antd/TextField';

const Component = ({ component }) => {
  const model = component => ({
    name: component.name || '',
    description: component.description || ''
  });

  const schema = new SimpleSchema({
    name: String,
    description: String
  },
  {
    requiredByDefault: false
  });

  return (
    <AutoForm
      autosave
      autosaveDelay={500}
      model={model(component)}
      onSubmit={data => updateComponent({ componentId: component.id, updates: data })}
      schema={schema}
    >
      <TextField name="name" />
      <LongTextField name="description" />
    </AutoForm>
  );
};

Component.propTypes = {
  component: PropTypes.object.isRequired
};

export default Component;
