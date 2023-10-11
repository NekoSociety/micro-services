/*----------------------------------------------------------------------------
Imports
----------------------------------------------------------------------------*/
'use client'
import React from 'react'

import { Button, Checkbox, Form, Input } from 'antd'

import type { NextPage } from 'next'

import Wrapper from '@/components/layout/Wrapper'
import { useSignUpMutation } from '@/redux/services/user-api'
import type { IUserPayload } from '@/redux/services/user-api'

/*----------------------------------------------------------------------------
Types
----------------------------------------------------------------------------*/
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
  },
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24 },
  },
}

/*----------------------------------------------------------------------------
Page
----------------------------------------------------------------------------*/
const SignUp: NextPage = () => {
  const [form] = Form.useForm()
  const [signUp, response] = useSignUpMutation()
  const onFinish = async (values: IUserPayload) => {
    signUp(values)
      .unwrap()
      .then((r) => {
        console.log('r: ', r)
        console.log('response: ', response)
      })
      .then((error) => {
        console.log(error)
      })
  }

  return (
    <Wrapper>
      <Form
        {...formItemLayout}
        form={form}
        layout="vertical"
        name="register"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item<IUserPayload>
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid e-mail!',
            },
            {
              required: true,
              message: 'Please input your e-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<IUserPayload>
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
              min: 8,
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<IUserPayload>
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('The new password that you entered do not match!'))
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<IUserPayload>
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  )
}

export default SignUp
