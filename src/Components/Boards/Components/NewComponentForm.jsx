import React, {useState} from "react";
import { useMutation } from "@apollo/react-hooks";

import { queries } from "../../../Services/graphql";

import { Alert, Button, Form, Icon, Input, message } from "antd";

const NewComponentForm = ({ form, boardId }) => {
  const [error, setError] = useState('');
  const [createComponent] = useMutation(
    queries.createComponent,
    { refetchQueries: [
      { query: queries.projectsBoardsComponents },
      { query: queries.componentsForBoard, variables: { boardId } },
      { query: queries.projects },
      { query: queries.components }
    ] }
  );

  const { Item } = Form;
  const { TextArea } = Input;
  const { getFieldDecorator, validateFields } = form;

  const submit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if(!err) {
        createComponent({ variables: {
            boardId,
            name: values.name,
            description: values.description,
          } })
          .then(res => {
            message.success(
              `Created component '${res.data.createComponent.component.name}'.`
            );
            form.resetFields();
          })
          .catch(error => setError(error.message));
      }
    });
  };

  return (
    <Form onSubmit={submit}>
      { error &&
        <Alert
          type="error"
          message="Could not create a component"
          description={error}
          showIcon
          style={{ marginBottom: '1rem' }}
        />
      }

      <Item label="Name">
        { getFieldDecorator('name', {
          rules: [{
            required: true,
            whiteSpace: true,
            message: 'Name is required'
          }, {
            max: 255,
            message: 'The name is too long'
          }]
        })(
          <Input placeholder="Component's name" autoFocus />
        ) }
      </Item>

      <Item label="Description">
        { getFieldDecorator('description', {})(
          <TextArea rows={3} placeholder="Put technical parameters here" />
        ) }
      </Item>

      <Item>
        <Button htmlType="submit">
          <Icon type="save" /> Save
        </Button>
      </Item>
    </Form>
  );
};

export default Form.create({ name: 'new-component-form' })(NewComponentForm);
