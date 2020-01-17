import React from 'react';

import { requestInvitation } from "../../Services/api";

import { Button, Form, Icon, Input, message } from "antd";

const InvitationRequestForm = ({ form }) => {
  const { getFieldDecorator, getFieldError, getFieldsError, isFieldTouched, setFieldsValue } = form;

  const hasErrors = fieldsError => (
    Object.keys(fieldsError).some(field => fieldsError[field])
  );

  const emailError = isFieldTouched('email') && getFieldError('email');

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, data) => {
      !err && requestInvitation(data)
        .then(response => {
          response.status === 201 &&
          message.success(`Created invitation for ${data.email}`);
          setFieldsValue({ email: '' });
        })
        .catch(_ =>
          message.error(`${data.email} is already used or invitation for this email has been requested`)
        )
      ;
    });
  };

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

      <Form.Item className="form-buttons">
        <Button
          type="primary"
          htmlType="submit"
          disabled={!isFieldTouched('email') || hasErrors(getFieldsError())}
        >
          Request invitation <Icon type="arrow-right" />
        </Button>

        <Button>
          Continue as guest <Icon type="clock-circle" />
        </Button>
      </Form.Item>
    </Form>
  );
};

const WrappedForm = Form.create({ name: 'invitation_request_form' })(InvitationRequestForm);

export default WrappedForm;
