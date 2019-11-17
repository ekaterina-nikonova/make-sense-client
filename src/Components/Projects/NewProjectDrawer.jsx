import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import { queries } from "../../Services/graphql";

import { Button, Drawer, Form, Icon, Input, Select, Spin } from "antd";

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

  const { Item } = Form;
  const { TextArea } = Input;
  const { Option } = Select;
  const { getFieldDecorator, validateFields } = form;

  const createProject = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if(!err) {
        form.resetFields();
        console.log(values);
        // submit(values);
        close();
      }
    });
  };

  const cancel = e => {
    form.resetFields();
    close();
  };

  return (
    <Form onSubmit={createProject}>
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

      <Item label="Select components">
        { getFieldDecorator('components', {})(
          <Select
            mode="multiple"
            placeholder="Components used in the project"
          >
            <Option value="comp1">Component 1</Option>
            <Option value="comp2">Component 2</Option>
            <Option value="comp3">Component 3</Option>
            <Option value="comp4">Component 4</Option>
          </Select>
        )}
      </Item>

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

const WrappedForm = Form.create({name: 'new-project-form'})(NewProjectForm);

export default NewProjectDrawer;
