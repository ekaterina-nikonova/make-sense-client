import React from 'react';

import { Button, Form, Icon, Input } from 'antd';

const LoginForm = ({ form }) => {
  const { Item } = Form;
  const { getFieldDecorator, validateFields } = form;

  const formLayout = {};

  const logIn = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values from form: ', values)
      }
    });
  };

  return (
    <Form { ...formLayout } onSubmit={logIn} className="login-form-container">
      <Item>
        { getFieldDecorator('email', {
          rules: [
            {
              required: true,
              whitespace: true,
              message: 'Please enter your email or username.'
            }
          ]
        })(
          <Input
            prefix={<Icon type="user" />}
            placeholder="Username or email"
          />
        )}
      </Item>

      <Item>
        { getFieldDecorator('password', {
          rules: [
            {
              required: true,
              whitespace: true,
              message: 'Please enter your password.'
            }
          ]
        })(
          <Input
            prefix={<Icon type="lock" />}
            placeholder="Password"
          />
        ) }
      </Item>

      <Button type="primary" block htmlType="submit">Log in</Button>
    </Form>
  );
};

const WrappedForm = Form.create({ name: 'login_form' })(LoginForm);

export default WrappedForm;
