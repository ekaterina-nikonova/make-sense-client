import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from "@apollo/react-hooks";

import { queries } from "../../../Services/graphql";

import { Typography, message } from "antd";

const Component = ({ component }) => {
  const [updateComponent] = useMutation(
    queries.updateComponent,
    { refetchQueries: [{ query: queries.projectsBoardsComponents }] }
  );

  const { Paragraph } = Typography;

  const updateName = str => {
    updateComponent({
      variables: { id: component.id, name: str }
    }).then(res => message.success(`${component.name} saved.`))
      .catch(err => message.error('Could not update.'));
  };

  const updateDescription = str => {
    updateComponent({
      variables: { id: component.id, description: str }
    }).then(res => message.success(`${component.name} saved.`))
      .catch(err => message.error('Could not update.'));
  };

  return (
    <React.Fragment>
      {component.image &&
        <img
          alt={component.name}
          src={component.image || require('../../../Assets/Images/component-generic.svg')}
          className="component-image"
        />
      }

      <Paragraph editable={{ onChange: updateName }}>{ component.name }</Paragraph>

      <Paragraph editable={{ onChange: updateDescription }}>{ component.description }</Paragraph>
    </React.Fragment>
  );
};

Component.propTypes = {
  component: PropTypes.object.isRequired
};

export default Component;
