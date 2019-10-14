import React, {useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom';

import { Button, Card, Col, Form, Icon, Input, Row, message } from 'antd';

import { authSignup } from '../../Services/auth';
import { LoggedInContext } from '../../App';

const SignupPage = () => {
  const formWidth = {
    xs: 24,
    sm: 16,
    md: 12,
    lg: 10,
    xl: 8
  };

  return (
    <Row type="flex" align="middle" justify="center">
      <Col {...formWidth }>
        <Card title="Sign up" className="signup-card">
          <WrappedForm />
        </Card>
      </Col>
    </Row>
  );
};

const SignupForm = ({ form }) => {
  const [error, setError] = useState();

  useEffect(() => showErrorMessage(error), [error]);

  const { Item } = Form;
  const { getFieldDecorator, validateFields } = form;

  const formLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };

  const showErrorMessage = err => {
    if (err) {
      switch (err.response.status) {
        case 403:
          message.error('Wrong email address or invitation code.');
          break;
        case 422:
          message.error('Could not sign up. Please try again.');
          break;
        default:
          message.error('Something went wrong.');
      }
    }
  };

  const signUp = e => {
    e.preventDefault();
    validateFields((validationError, values) => {
      if (!validationError) {
        authSignup(values, setError);
      }
    });
  };

  return (
    <Form {...formLayout} onSubmit={signUp}>
      <Item label="Email">
        { getFieldDecorator('email', {
          rules: [
            {
              required: true,
              whitespace: true,
              message: 'Please provide an email.'
            }
          ]
        })(
          <Input prefix={<Icon type="mail" />} />
        ) }
      </Item>

      <Item label="Username">
        { getFieldDecorator('username', {
          rules: [
            {
              required: true,
              whitespace: true,
              message: 'Please choose a unique username.'
            }
          ]
        })(
          <Input prefix={<Icon type="user" />} />
        ) }
      </Item>

      <Item label="Password">
        { getFieldDecorator('password', {
          rules: [
            {
              required: true,
              whitespace: true,
              message: 'Please provide a password.'
            }
          ]
        })(
          <Input type="password" prefix={<Icon type="lock" />} />
        ) }
      </Item>

      <Item label="Invitation code">
        { getFieldDecorator('invitation_code')(
          <Input prefix={<Icon type="key" />} />
        ) }
      </Item>

      <Button type="primary" htmlType="submit" block>Sign up</Button>
    </Form>
  );
};

const WrappedForm = Form.create({ name: 'signup_form '})(SignupForm);

const WrappedSignupPage = () => (
  <LoggedInContext.Consumer>
    {loggedIn => (
      !loggedIn ? <SignupPage /> : <Redirect to='/' />
    )}
  </LoggedInContext.Consumer>
);

export default WrappedSignupPage;
