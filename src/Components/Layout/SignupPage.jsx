import React from 'react';

import { Button, Card, Col, Form, Icon, Input, Row } from 'antd';

const SignupPage = ({ form }) => {
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

  const signUp = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
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

export default SignupPage;
