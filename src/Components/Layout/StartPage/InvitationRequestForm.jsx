import React, { useEffect } from 'react';
import { Button, Form, Icon, Input } from "antd";

const InvitationRequestForm = ({ form }) => {
  const { getFieldDecorator, getFieldError, getFieldsError, isFieldTouched, validateFields } = form;

  const hasErrors = fieldsError => (
    Object.keys(fieldsError).some(field => fieldsError[field])
  );

  const emailError = isFieldTouched('email') && getFieldError('email');

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      !err && console.log('Received values: ', values);
    });
  };

  useEffect(() => {
    console.log("Effect");
    form.validateFields();
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item validateStatus={emailError ? 'error': ''} help={emailError || ''}>
        {getFieldDecorator('email', {
          rules: [
            {
              type: 'email',
              message: 'This is not a valid email address'
            },
            {
              required: true,
              message: 'Please enter your email'
            }
          ]
        })(
          <Input
            prefix={<Icon type="mail" />}
            placeholder="Your email"
          />
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
          Request invitation <Icon type="arrow-right" />
        </Button>
      </Form.Item>
    </Form>
  );
};

const WrappedForm = Form.create({ name: 'invitation_request_form' })(InvitationRequestForm);

export default WrappedForm;
