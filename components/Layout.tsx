import { Layout, Menu } from 'antd';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { getApplicantById } from '../common/apiClient';
import { Logo } from './Logo';
import styles from '../styles/components/Layout.module.scss';

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
  return (
    <Layout>
      <Header className={styles.header}>
        <div className="logo">
          <Logo />
        </div>
      </Header>
      <Layout>
        <Sider width={200} className={styles.sider}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[currentPage]}
            style={{ height: '100%', borderRight: 0, marginTop: '100px' }}
          >
            <Menu.Item key="home" onClick={() => router.push('/dashboard')}>
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
            <Menu.Item key="logout" onClick={() => router.push('/login')}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              paddingTop: 100,
              paddingLeft: 200,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
