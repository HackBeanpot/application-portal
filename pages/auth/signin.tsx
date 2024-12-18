import React, { ReactElement, useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { type InferGetServerSidePropsType, GetServerSideProps } from 'next';
import Image from 'next/image';
import { Session, getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';


const SignIn = ({session}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [form] = Form.useForm();

  useEffect(() => {
    if (session?.user?.email) {
      router.push('/');
    }
  }, [router, session?.user?.email]);

  const onSubmit = async (values: { email: string }) => {
    setIsLoading(true);
    const response = await signIn<'email'>('email', {
      redirect: false,
      email: values.email,
    });

    if (response?.ok) {
      setIsSubmitted(true);
    }
    setIsLoading(false);
  };

  return (
    <div className="signinPage">
      <div className="logoWrapper">
        <Image
          className="signinLogo"
          width={200}
          height={180}
          src="/logo_big.png"
          alt="HackBeanpot logo"
        />
      </div>
      <Form
        className={isSubmitted ? 'signinForm centered-text' : 'signinForm'}
        form={form}
        name="signin"
        autoComplete="off"
        onFinish={onSubmit}
        validateTrigger={'onSubmit'}
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
              <Input className="email-input" placeholder="Email address" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="submitButton"
                loading={isLoading}
              >
                Sign in with Email
              </Button>
            </Form.Item>
          </>
        )}
        {isSubmitted && (
          <p className="success-message">
            A sign in link has been sent to your email address.
          </p>
        )}
      </Form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = (async (ctx) => {
  const {req, res} = ctx
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return { props: { session } };
}) satisfies GetServerSideProps<{ session: Session | null }>;

export default SignIn;
