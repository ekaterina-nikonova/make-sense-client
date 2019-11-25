import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { queries } from "../../../Services/graphql";

import { Button, Col, Empty, Icon, message, PageHeader, Row, Select, Typography } from "antd";

const ProjectHeader = ({ board, history, project }) => {
  const [ updateProject ] = useMutation(queries.updateProject);

  const { Text, Title } = Typography;

  const updateName = str => updateProject({
    variables: { id: project.id, name: str }
  });

  return (
    <PageHeader
      onBack={() => history.push('/projects')}
      title={<Title level={4} editable={{ onChange: updateName }}>
        {project.name}
      </Title>}
    >
      { !project.description && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={false}
        >
          <Button>Add a description</Button>
        </Empty>
      ) }

      { project.description && (
        <div>{project.description}</div>
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

  const handleUpdate = selection => {
    const id = project.id;
    updateProject({ variables: { id, components: selection} })
      .then(res => message.success('Project saved.'))
      .catch(err => message.error('Could not update the project.'));
  };

  return (
    <Select
      mode="multiple"
      value={components}
      onChange={handleUpdate}
      placeholder="Select components"
      dropdownClassName="project-attrs-select"
      style={{ width: '100%' }}
    >
      { board && board.components && board.components.map(c =>
        <Option key={c.id} value={c.id}>{c.name}</Option>
      ) }
    </Select>
  );
};

export default ProjectHeader;
