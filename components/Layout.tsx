import { Dropdown, Layout, Menu } from 'antd';
import useSWR from 'swr';
import { getUser } from '../common/apiClient';
import Logo from '../public/logo.svg';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import Link from 'next/link';

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
          <Menu.Item key="home">
            <Link href="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="application">
            <Link href="/application">Application</Link>
          </Menu.Item>
          <Menu.Item key="team">
            <Link href="/team">Team</Link>
          </Menu.Item>
          {user?.data?.isAdmin && (
            <Menu.Item key="admin">
              <Link href="/admin">Admin</Link>
            </Menu.Item>
          )}
        </Menu>
        <div className="user">
          <Dropdown
            className="user"
            overlay={
              <Menu theme={'light'}>
                <Menu.Item>
                  <Link href="/api/auth/signout">Sign out</Link>
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
