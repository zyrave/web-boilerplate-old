import React, { FC, ReactNode } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Container } from 'reactstrap';

import {
  Aside,
  Footer,
  Header,
  Sidebar,
  SidebarFooter,
  SidebarForm,
  SidebarHeader,
  // SidebarMinimizer,
  Breadcrumb,
  SidebarNav,
} from '../components';
import navigation from '../_nav';
import routes from '../routes';
import { useLogoutMutation } from '../generated/graphql';
import redirect from '../lib/redirect';
import Validation from './Validation';

const DefaultAside = dynamic(() => import('./views/DefaultAside'));
const DefaultFooter = dynamic(() => import('./views/DefaultFooter'));
const DefaultHeader = dynamic(() => import('./views/DefaultHeader'));

interface Props {
  children?: ReactNode;
  title: string;
}

const Layout: FC<Props> = ({ children, title }, ...ctx) => {
  const [logout] = useLogoutMutation();
  // const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  const handleLogout = async (e: React.MouseEvent<any, MouseEvent>) => {
    e.preventDefault();
    try {
      const response = await logout();

      if (response.data) {
        redirect(ctx, '/user/login');
      }
    } catch (err) {
      console.log(err);
      return;
    }
  };

  return (
    <Validation>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="app">
        <Header fixed>{<DefaultHeader onLogout={e => handleLogout(e)} />}</Header>
        <div className="app-body">
          <Sidebar fixed display="lg">
            <SidebarHeader />
            <SidebarForm />
            <SidebarNav navConfig={navigation} />
            <SidebarFooter />
            {/* <SidebarMinimizer /> */}
          </Sidebar>
          <main className="main">
            <Breadcrumb appRoutes={routes} />
            <Container fluid>{children}</Container>
          </main>
          <Aside fixed>
            <DefaultAside />
          </Aside>
        </div>
        <Footer>
          <DefaultFooter />
        </Footer>
      </div>
    </Validation>
  );
};

export default Layout;
