import React, {useEffect, useState} from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Query } from "react-apollo";

import { queries } from "../../../Services/graphql";

import { Button, Col, Empty, Icon, Input, message, PageHeader, Row, Select, Switch, Tooltip, Typography } from "antd";

const ProjectHeader = ({ board, history, project }) => {
  const [ descriptionEdit, setDescriptionEdit ] = useState(false);
  const [ newDescription, setNewDescription ] = useState('');
  const [ updateProject ] = useMutation(queries.updateProject);

  const { Paragraph, Text, Title } = Typography;
  const { TextArea } = Input;

  const updateName = str => updateProject({
    variables: { id: project.id, name: str }
  });

  const updateDescription = str => updateProject({
    variables: { id: project.id, description: str }
  });

  const updatePublic = checked => updateProject({
    variables: { id: project.id, public: checked }
  });

  const createDescription = e =>
    updateProject({
      variables: { id: project.id, description: newDescription }
    })
      .then(res => {
        toggleDescriptionEdit();
        message.success('Project saved.');
      })
      .catch(err => message.error('Could not update the project'));

  const toggleDescriptionEdit = () =>
    setDescriptionEdit(!descriptionEdit);

  return (
    <PageHeader
      onBack={() => history.push('/projects')}
      title={
        <Title
          level={4}
          editable={{ onChange: updateName }}
          className="icons-show-on-hover"
        >
          {project.name}
        </Title>
      }
    >
      <Tooltip title={`Make ${project.public ? "private" : "public"}`}>
        <Switch
          checkedChildren={<Icon type="unlock" />}
          unCheckedChildren={<Icon type="lock" />}
          checked={project.public}
          onChange={updatePublic}
          className="project-public-switch"
        />
      </Tooltip>

      { !project.description && !descriptionEdit && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={false}
        >
          <Button onClick={toggleDescriptionEdit}>Add a description</Button>
        </Empty>
      ) }

      { descriptionEdit && (
        <div className="project-description-edit-container">
          <TextArea
            rows={5}
            defaultValue={project.description}
            onChange={e => setNewDescription(e.target.value)}
            placeholder="Write a description for your project."
            allowClear
          />
          <Button onClick={toggleDescriptionEdit}>Cancel</Button>
          <Button type="primary" onClick={createDescription}>Save</Button>
        </div>
      ) }

      { project.description && !descriptionEdit && (
        <Paragraph
          editable={{ onChange: updateDescription }}
          className="description-edit-textarea icons-show-on-hover"
        >
          {project.description}
        </Paragraph>
      ) }

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Text strong className="subtitle-small">Board</Text>
          <BoardSelect
            id={project.id}
            board={board}
          />
        </Col>

        <Col xs={24} md={12}>
          <Text strong className="subtitle-small">
            Components
          </Text>

          <ComponentSelect
            project={project}
            board={project.board}
          />
        </Col>
      </Row>
    </PageHeader>
  );
};

const BoardSelect = ({ board, id }) => {
  const { loading, error, data } = useQuery(queries.boards);
  const [ updateProject ] = useMutation(queries.updateProject);

  const { Option } = Select;

  const handleUpdate = selection =>
    updateProject({ variables: {
        id,
        board: selection,
        components: []
      }});

  return (
    <Select
      defaultValue={board.id}
      onChange={handleUpdate}
      placeholder={
        (error && (
          <span>
            <Icon type="exclamation-circle"
                  theme="twoTone"
                  twoToneColor="red"
            /> Could not load
          </span>
        )) || (loading && (
          <span><Icon type="loading" /> Loading...</span>
        )) || (data && "Select a board") || (
          <span><Icon type="frown" /> Something went wrong</span>
        )
      }
      dropdownRender={menu => (
        <React.Fragment>
          <div onMouseDown={e => e.preventDefault()} className="select-dropdown-header">
            <Icon type="warning" /> All components will be removed
          </div>
          { menu }
        </React.Fragment>
      )}
      filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      dropdownClassName="project-attrs-select"
      style={{ width: '100%' }}
    >
      { data && data.boards && data.boards.map(b =>
        <Option key={b.id} value={b.id}>{ b.name }</Option>
      )}
    </Select>
  );
};

const ComponentSelect = ({ board, project }) => {
  const [ updateProject ] = useMutation(queries.updateProject);

  const { Option } = Select;

  const components = project.components.map(c => c.id);

  const subscribe = subscribeToMore => {
    subscribeToMore({
      document: queries.componentAdded,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const newComponent = subscriptionData.data.componentAdded;

        if (prev.componentsForBoard.map(comp => comp.id).includes(newComponent.id)) return prev;

        return Object.assign({}, prev, {
          componentsForBoard: [newComponent, ...prev.componentsForBoard],
          __typename: prev.componentsForBoard.__typename
        });
      }
    });

    subscribeToMore({
      document: queries.componentDeleted,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const deletedComponent = subscriptionData.data.componentDeleted;

        return Object.assign({}, prev, {
          componentsForBoard: prev.componentsForBoard.filter(comp => comp.id !== deletedComponent),
          __typename: prev.componentsForBoard.__typename
        })
      }
    });
  };

  const handleUpdate = selection => {
    const id = project.id;
    updateProject({ variables: { id, components: selection} })
      .then(res => message.success('Project saved.'))
      .catch(err => message.error('Could not update the project.'));
  };

  return (
    <Query query={queries.componentsForBoard} variables={{ boardId: board.id }}>
      {({ loading, error, data, subscribeToMore }) => {
        useEffect(() => subscribe(subscribeToMore), []);

        return (
          <Select
            mode="multiple"
            value={components}
            onChange={handleUpdate}
            placeholder={
              (error && (
                <span>
              <Icon type="exclamation-circle" theme="twoTone" twoToneColor="red" /> Could not load
            </span>
              )) ||
              (loading && (<span><Icon type="loading" /> Loading...</span>)) ||
              (data && 'Select components') ||
              (<span><Icon type="frown" /> Something went wrong</span>)
            }
            dropdownClassName="project-attrs-select"
            style={{ width: '100%' }}
          >
            { data && data.componentsForBoard && data.componentsForBoard.map(c =>
              <Option key={c.id} value={c.id}>{c.name}</Option>
            ) }
          </Select>
        );
      }}
    </Query>
  );
};

export default ProjectHeader;
