import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { queries } from "../../Services/graphql";

import { Button, Drawer, Form, Icon, Input, Select } from "antd";

const NewProjectDrawer = () => {
  const [ drawerOpen, setDrawerOpen ] = useState(false);

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <React.Fragment>
      <Button type="primary" shape="circle" className="floating-action-button" onClick={openDrawer}>
        <Icon type="plus-circle" />
      </Button>

      <Drawer
        title="New project"
        visible={drawerOpen}
        onClose={closeDrawer}
        width="fit-content"
        className="new-project-container"
      >
        <WrappedForm close={closeDrawer} />
      </Drawer>
    </React.Fragment>
  );
};

const NewProjectForm = ({ form, close }) => {
  const { loading, error, data } = useQuery(queries.boardNames);
  const [createProject] = useMutation(queries.createProject);
  const [selectedBoard, setSelectedBoard] = useState();

  const { Item } = Form;
  const { TextArea } = Input;
  const { Option } = Select;
  const { getFieldDecorator, validateFields } = form;

  const submit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if(!err) {
        console.log(values);
        createProject({ variables: {
          boardId: values.board,
          name: values.name,
          description: values.description,
          components: values.components
        } })
        .then(res => {
          console.log(res);
          form.resetFields();
          close();
        });
      }
    });
  };

  const cancel = e => {
    form.resetFields();
    close();
  };

  return (
    <Form onSubmit={submit}>
      <Item label="Name">
        { getFieldDecorator('name', {
          rules: [{
            required: true,
            whitespace: true,
            message: 'Name is required'
          }, {
            max: 255,
            message: 'The name is too long'
          }]
        })(
          <Input placeholder="Name of the project" autoFocus />
        )}
      </Item>

      <Item label="Description">
        { getFieldDecorator('description', {})(
            <TextArea rows={5} placeholder="What is your project about?" />
        )}
      </Item>

      <Item label="Select a board">
        { getFieldDecorator('board', {
          rules: [{
            required: true,
            message: 'Board is required'
          }]
        })(
          <Select
            showSearch
            disabled={loading || error}
            onSelect={b => setSelectedBoard(b)}
            placeholder={
              (error && (
                <span>
                  <Icon
                    type="exclamation-circle"
                    theme="twoTone"
                    twoToneColor="red"
                  /> Could not load
                </span>)
              ) || (
                loading && (
                  <span><Icon type="loading" /> Loading...</span>
                )
              ) || (
                data && "Select a board"
              ) || <span><Icon type="frown" /> Something went wrong</span>
            }
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            { data && data.boards && data.boards.map(board =>
              <Option key={board.id} value={board.id}>{board.name}</Option>
            ) }
          </Select>
        )}
      </Item>

      { selectedBoard && <ComponentsSelect board={selectedBoard} decorator={getFieldDecorator} /> }

      <div className="new-project-form-buttons">
        <Button onClick={cancel}>
          <Icon type="delete" /> Cancel
        </Button>

        <Button type="primary" htmlType="submit">
          <Icon type="save" /> Create
        </Button>
      </div>
    </Form>
  );
};

const ComponentsSelect = ({ board, decorator }) => {
  const { loading, error, data } = useQuery(
    queries.componentsForBoard,
    { variables: { boardId: board } }
  );
  const { Item } = Form;
  const { Option } = Select;

  return (
    <Item label="Select components">
      { decorator('components', {})(
        <Select
          mode="multiple"
          disabled={loading || error}
          placeholder="Components used in the project"
        >
          { data && data.componentsForBoard && data.componentsForBoard.map(c =>
            <Option key={c.id} value={c.id}>{c.name}</Option>
          ) }
        </Select>
      )}
    </Item>
  );
};

const WrappedForm = Form.create({name: 'new-project-form'})(NewProjectForm);

export default NewProjectDrawer;
