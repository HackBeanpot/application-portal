import React, {
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
import Image from 'next/image';

const SignIn = (): ReactElement => {
  const [email, setEmail] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.data?.user?.email) {
      router.push('/');
    }
  }, [session.data?.user?.email]);

  const loginOnPress = async (
    event: FormEvent<HTMLInputElement>,
    options: SignInOptions
  ) => {
    setIsLoading(true);
    const response: SignInResponse = (await signIn('email', options)) as any;

    if (response.ok) {
      setIsSubmitted(true);
    }
    setIsLoading(false);
  };

  const updateEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <div className="signinPage">
      <div className="logoWrapper">
        <Image
          className="signinLogo"
          width={200}
          height={180}
          src="/logo_big.png"
        />
      </div>
      <Form
        className= {isSubmitted ? "signinForm centered-text" : "signinForm"}
        name="signin"
        autoComplete="off"
        onFinish={async (e) =>
          await loginOnPress(e, { redirect: false, email })
        }
      >
        {!isSubmitted && (
          <>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: 'Please input a valid email!',
                },
              ]}
            >
              <Input
                className="email-input"
                onChange={updateEmail}
                value={email}
                placeholder="Email address"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="submitButton" loading={isLoading}>
                Sign in with Email
              </Button>
            </Form.Item>
          </>
        )}
        {isSubmitted && <p className="success-message">A sign in link has been sent to your email address.</p>}
      </Form>
    </div>
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
