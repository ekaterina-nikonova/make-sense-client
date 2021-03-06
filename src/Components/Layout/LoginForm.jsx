import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { Alert, Button, Form, Icon, Input } from 'antd';

import { authLogin } from '../../Services/auth';

const LoginForm = ({ form, closeDrawer }) => {
  const [error, setError] = useState();

  const { Item } = Form;
  const { getFieldDecorator, validateFields } = form;

  const formLayout = {};

  const logIn = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        authLogin(
          { ...values, email: values.email.trim() },
          setError
        );
      }
    });
  };

  return (
    <Form { ...formLayout } onSubmit={logIn} className="login-form-container">
      {error &&
        error.response.status === 401 &&
          <Alert
            type="error"
            message="Wrong username/email or password"
            showIcon
            icon={<Icon type="close-circle"/>}
          />
      }

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
            type="password"
          />
        ) }
      </Item>

      <Button type="primary" block htmlType="submit">
        Log in <Icon type="login" />
      </Button>

      <div style={{ margin: '1rem 0' }}>
        <span>Haven't registered yet? </span>
        <Link onClick={closeDrawer} to="/signup">Sign up</Link>
      </div>
    </Form>
  );
};

const WrappedForm = Form.create({ name: 'login_form' })(LoginForm);

export default WrappedForm;
