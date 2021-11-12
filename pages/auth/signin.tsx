import { getCsrfToken } from 'next-auth/react';
import { ReactElement } from 'react';
import { CtxOrReq } from 'next-auth/lib/client';
import { Form, Input, Button, Checkbox } from 'antd';

interface SignInProps {
  csrfToken: string;
}

const SignIn = ({ csrfToken }: SignInProps): ReactElement => {
  // const onFinish = (values: any) => {
  //   console.log('Success:', values);
  // };
  //
  // const onFinishFailed = (errorInfo: any) => {
  //   console.log('Failed:', errorInfo);
  // };

  return (
    <Form
      name="basic"
      method="post"
      action="/api/auth/signin/email"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      autoComplete="off"
    >
      <Input name="csrfToken" type="hidden" defaultValue={csrfToken} />

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignIn;

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context: CtxOrReq) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}
