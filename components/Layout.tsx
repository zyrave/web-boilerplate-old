import React, { FC, ReactNode } from 'react';
import dynamic from 'next/dynamic';
// import { Redirect, Route, Switch } from 'react-router-dom';
// import * as router from 'react-router-dom';
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
// sidebar nav config
import navigation from '../_nav';
import Head from 'next/head';
// routes config
import routes from '../routes';

const DefaultAside = dynamic(() => import('./views/DefaultAside'));
const DefaultFooter = dynamic(() => import('./views/DefaultFooter'));
const DefaultHeader = dynamic(() => import('./views/DefaultHeader'));

interface Props {
  children?: ReactNode;
  title: string;
}

const Layout: FC<Props> = ({ children, title }) => {
  // const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  const signOut = (e: React.MouseEvent<any, MouseEvent>) => {
    e.preventDefault();
    // this.props.history.push('/login');
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="app">
        <Header fixed>{<DefaultHeader onLogout={e => signOut(e)} />}</Header>
        <div className="app-body">
          <Sidebar fixed display="lg">
            <SidebarHeader />
            <SidebarForm />
            <SidebarNav navConfig={navigation} /*{...props}*/ /*router={router}*/ />
            <SidebarFooter />
            {/* <SidebarMinimizer /> */}
          </Sidebar>
          <main className="main">
            <Breadcrumb appRoutes={routes} /*router={router}*/ />
            <Container fluid>
              {/* <Switch>
              {routes.map((route: any, idx: any) =>
                route.component ? (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => <route.component {...props} />}
                  />
                ) : null,
              )}
              <Redirect from="/" to="/dashboard" />
            </Switch> */}
              {children}
            </Container>
          </main>
          <Aside fixed>
            <DefaultAside />
          </Aside>
        </div>
        <Footer>
          <DefaultFooter />
        </Footer>
      </div>
    </>
  );
};

export default Layout;
