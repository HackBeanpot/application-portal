import {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { Form, Input, Button } from 'antd';
import { getSession, signIn, SignInOptions, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { SignInResponse } from 'next-auth/react/types';
import { GetServerSideProps } from 'next';

const SignIn = (): ReactElement => {
  const [email, setEmail] = useState<string>('');
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.data?.user?.email) {
      console.log('user already logged in');
      router.push('/');
    }
  }, [session.data?.user?.email]);

  const loginOnPress = async (
    event: FormEvent<HTMLInputElement>,
    options: SignInOptions
  ) => {
    console.log('gets here on submit');

    const response: SignInResponse = (await signIn('email', options)) as any;

    if (response.ok) {
      console.log('email sent');
      await router.push('/api/auth/verify-request');
    }
  };

  const updateEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <Form
      name="signin"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      autoComplete="off"
      onFinish={async (e) => await loginOnPress(e, { redirect: false, email })}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            type: 'email',
            message: 'Please input your email!',
          },
        ]}
      >
        <Input onChange={updateEmail} value={email} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return { props: { session } };
};

export default SignIn;
