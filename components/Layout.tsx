import { Layout, Menu } from 'antd';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { getApplicantById } from '../common/apiClient';
import styles from '../styles/components/Layout.module.scss';
import Logo from '../public/logo.svg';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { useSessionOrRedirect } from '../hooks/useSessionOrRedirect';

const { Header, Content, Sider } = Layout;

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
        <Sider className={styles.sider}>
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
          <Content className={styles.content}>
            <div>{children}</div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
