import { Dropdown, Layout, Menu } from 'antd';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { getUser } from '../common/apiClient';
import Logo from '../public/logo.svg';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import React from 'react';
import { DownOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

const Pages = ['home', 'application', 'team', 'admin', 'logout'] as const;
type PageLayoutProps = {
  currentPage: typeof Pages[number];
};

export const PageLayout: React.FC<PageLayoutProps> = ({
  currentPage,
  children,
}) => {
  const { data: user } = useSWR('/api/v1/user', getUser);
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <Layout className="layout">
      <Header className="header">
        <div className="logo-container">
          <Image
            className="logo"
            src={Logo}
            alt="HackBeanpot logo"
            width={32}
            height={32}
          />
        </div>
        <Menu
          className="menu"
          theme="dark"
          mode="horizontal"
          selectedKeys={[currentPage]}
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
          <Menu.Item key="team" onClick={() => router.push('/team')}>
            Team
          </Menu.Item>
          {user?.data?.isAdmin && (
            <Menu.Item key="admin" onClick={() => router.push('/admin')}>
              Admin
            </Menu.Item>
          )}
        </Menu>
        <div className="user">
          <Dropdown
            className="user"
            overlay={
              <Menu theme={'light'}>
                <Menu.Item onClick={() => router.push('/api/auth/signout')}>
                  Sign out
                </Menu.Item>
              </Menu>
            }
          >
            <a className="ant-dropdown-link">
              {session?.user?.email ?? 'Not Logged In'} <DownOutlined />
            </a>
          </Dropdown>
        </div>
      </Header>
      <Content className="content-container">
        <div className="content">{children}</div>
      </Content>
    </Layout>
  );
};
