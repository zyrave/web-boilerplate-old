import React, { FC, ReactNode } from 'react';
import { Container } from 'react-bootstrap';

import {
  Aside,
  Footer,
  Breadcrumb,
  Header,
  Sidebar,
  SidebarFooter,
  SidebarForm,
  SidebarHeader,
  // SidebarMinimizer,
  SidebarNav,
} from '..';
import navigation from '../../../_nav';
import { useLogoutMutation } from '../../../generated/graphql';
import redirectTo from '../../../utils/redirectTo';
import routes from '../../../routes';
import Validator from '../Validator';

interface Props {
  children?: ReactNode;
}

const MainLayout: FC<Props> = ({ children }, ...ctx) => {
  const [logout] = useLogoutMutation();
  // const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  const handleLogout = async (e: React.MouseEvent<any, MouseEvent>) => {
    e.preventDefault();
    try {
      const response = await logout();

      if (response.data) {
        redirectTo(ctx, '/users/login');
      }
    } catch (err) {
      console.error(err);
      return;
    }
  };

  return (
    <Validator>
      <div className="app">
        <Header fixed onLogout={e => handleLogout(e)} />
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
          <Aside fixed />
        </div>
        <Footer />
      </div>
    </Validator>
  );
};

export default MainLayout;
