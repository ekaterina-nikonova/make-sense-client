import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { queries } from "../../Services/graphql";

import { Icon, Select, Typography, message } from "antd";

const ComponentDetails = ({ component }) => {
  const { Paragraph, Text } = Typography;

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
      <Paragraph editable={{ onChange: str => updateName(component.id, component.name, str) }}>
        { component.name }
      </Paragraph>

      <Paragraph editable={{ onChange: str => updateDescription(component.id, component.name, str) }}>
        { component.description || <Text disabled>No description</Text> }
      </Paragraph>

      <BoardSelect component={component} />
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
      <label htmlFor="board-select">
        <Text type="secondary">Boards:</Text>
      </label>

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
          (!loading && (<span><Icon type="loading" /> Loading...</span>)) ||
          (data && 'Select boards') ||
          (<span><Icon type="frown" /> Something went wrong</span>)
        }
        filterOption={(input, option) =>
          option.props.children[2].toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        className="board-select"
        id="board-select"
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
