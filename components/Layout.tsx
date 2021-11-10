import { Layout, Menu } from 'antd';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { getApplicantById } from '../common/apiClient';
import styles from '../styles/components/Layout.module.scss';
import Logo from '../public/logo.svg';
import Image from 'next/image';
import { useSessionOrRedirect } from '../hooks/useSessionOrRedirect';
import React, { ReactNode, useState } from 'react';
import { Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import './sider.css';
const { Header, Content, Sider } = Layout;

const Pages = ['home', 'application', 'admin', 'logout'] as const;
type PageLayoutProps = {
  currentPage: typeof Pages[number];
};

export const SideBar = ({ menu }: { menu: ReactNode }) => {
  return (
    <Layout.Sider
      className="sider"
      breakpoint={'lg'}
      theme="light"
      collapsedWidth={0}
      trigger={null}
    >
      {menu}
    </Layout.Sider>
  );
};

import logo from 'logo.svg';
/**
export const NavBar = ({ menu }: {menu: ReactNode}) => {
  const [visible, setVisible] = useState(false);  return (
    <nav className="navbar">
      <Button
        className="menu"
        type="primary"
        icon={<MenuOutlined />}
        onClick={() => setVisible(true)}
      />
      <Drawer
        title="Topics"
        placement="left"
        onClick={() => setVisible(false)}
        onClose={() => setVisible(false)}
        visible={visible}
      > 
        {menu}
     </Drawer>
     <a href="/"><img src={logo} className="logo" alt="logo" /></a>     
    </nav>
  );
};


export const TopicMenu = ({ topics, selectedKey, changeSelectedKey }: 
  { topics: ReactNode, selectedKey: string, changeSelectedKey: ReactNode }) => {
  const styledTopics = [] as const;
  topics!.forEach((topic : string, index : string) =>
    styledTopics.push(
      <Menu.Item key={index} onClick={changeSelectedKey}>
        {topic}
      </Menu.Item>
    )
  );
  
  return (
    <Menu mode="inline" selectedKeys={[selectedKey]}>
      {styledTopics}
    </Menu>
  );
}
*/
export const PageLayout: React.FC<PageLayoutProps> = ({
  currentPage,
  children,
}) => {
  const { data: user } = useSWR('/api/v1/profile', () => getApplicantById(1));
  const router = useRouter();
  const session = useSessionOrRedirect();
  return (
    <Layout>
      <Header className={styles.header}>
        <Image src={Logo} alt="HackBeanpot logo" width={32} height={32} />
        <div className={styles.header__text}>
          HackBeanpot Application Portal
        </div>
        <div className={styles.header__user}>
          {session?.user?.email ?? 'Not Logged In'}
        </div>
      </Header>
      <Layout className={styles.sider_content_layout}>
        <Sider className={styles.sider} breakpoint="lg" collapsedWidth="0">
          <Menu
            mode="inline"
            defaultSelectedKeys={[currentPage]}
            className={styles.sider__menu}
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
        </Sider>
        <Layout className={styles.content__layout}>
          <Content className={styles.content}>{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
