import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { queries } from "../../Services/graphql";

import { Icon, Select, Typography, message } from "antd";
import ProjectList from "../Projects/ProjectList";

const ComponentDetails = ({ component }) => {
  const { Paragraph, Text, Title } = Typography;

  const [updateComponent] = useMutation(
    queries.updateComponent,
    { refetchQueries: [{ query: queries.projectsBoardsComponents }] }
  );

  const updateName = (id, componentName, str) => {
    updateComponent({
      variables: { id, name: str }
    }).then(res => message.success(`${componentName} saved.`))
      .catch(err => message.error('Could not update.'));
  };

  const updateDescription = (id, componentName, str) => {
    updateComponent({
      variables: { id, description: str }
    }).then(res => message.success(`${componentName} saved.`))
      .catch(err => message.error('Could not update.'));
  };

  return (
    <React.Fragment>
      <Title level={4} editable={{ onChange: str => updateName(component.id, component.name, str) }}>
        { component.name }
      </Title>

      <Paragraph editable={{ onChange: str => updateDescription(component.id, component.name, str) }}>
        { component.description || <Text disabled>No description</Text> }
      </Paragraph>

      <BoardSelect component={component} />

      { component.projects && !!component.projects.length && (
        <div className="component-details-project-list">
          <Text type="secondary" className="component-details-label">Projects:</Text>
          <ProjectList projects={component.projects} />
        </div>
      ) }

    </React.Fragment>
  );
};

const BoardSelect = ({ component }) => {
  const { loading, error, data } = useQuery(queries.boardNames);
  const [updateComponent] = useMutation(
    queries.updateComponent,
    { refetchQueries: [{query: queries.boards}]}
  );

  const { Option } = Select;
  const { Text } = Typography;

  const handleUpdate = selection =>
    updateComponent({ variables: {
        id: component.id,
        boards: selection
      }});

  return (
    <React.Fragment>
      <Text type="secondary" className="component-details-label">Boards:</Text>

      <Select
        mode="multiple"
        defaultValue={component.boards.map(b => b.id)}
        onChange={handleUpdate}
        placeholder={
          (error && (
            <span>
              <Icon type="exclamation-circle" theme="twoTone" twoToneColor="red" /> Could not load
            </span>
          )) ||
          (loading && (<span><Icon type="loading" /> Loading...</span>)) ||
          (data && 'Select boards') ||
          (<span><Icon type="frown" /> Something went wrong</span>)
        }
        filterOption={(input, option) =>
          option.props.children[2].toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        className="board-select"
      >
        { data && data.boards && data.boards.map(b =>
          <Option
            key={b.id}
            value={b.id}
          >
            <img
              src={b.imageUrl || require("../../Assets/Icons/icon-board.svg")}
              alt={b.name}
              className="board-select-image"
            /> { b.name }
          </Option>
        ) }
      </Select>
    </React.Fragment>
  );
};

export default ComponentDetails;
