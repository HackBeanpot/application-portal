import { Layout, Menu } from 'antd';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { getApplicantById } from '../common/apiClient';
import Logo from '../public/logo.svg';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import React from 'react';

const { Header, Content } = Layout;

const Pages = ['home', 'application', 'admin', 'logout'] as const;
type PageLayoutProps = {
  currentPage: typeof Pages[number];
};

export const PageLayout: React.FC<PageLayoutProps> = ({
  currentPage,
  children,
}) => {
  const { data: user } = useSWR('/api/v1/profile', () => getApplicantById(1));
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <Layout className="layout">
      <Header className="header">
        <div className="logo">
          <a
            className="logo-link"
            target="_blank"
            href="https://hackbeanpot.com/"
            rel="noopener noreferrer"
          >
            <Image src={Logo} alt="HackBeanpot logo" width={32} height={32} />
          </a>
        </div>
        <Menu
          className="menu"
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[currentPage]}
        >
          <Menu.Item key="home" onClick={() => router.push('/')}>
            Dashboard
          </Menu.Item>
          <Menu.Item
            key="application"
            onClick={() => router.push('/application')}
          >
            Application
          </Menu.Item>
          {user?.data.isAdmin && (
            <Menu.Item key="admin" onClick={() => router.push('/admin')}>
              Admin
            </Menu.Item>
          )}
          <Menu.Item
            key="logout"
            onClick={() => router.push('/api/auth/signout')}
          >
            Logout
          </Menu.Item>
        </Menu>
        <div className="user">{session?.user?.email ?? 'Not Logged In'}</div>
      </Header>
      <Content className="content">
        <div>{children}</div>
      </Content>
    </Layout>
  );
};
