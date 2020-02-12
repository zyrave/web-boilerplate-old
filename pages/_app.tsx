import { ApolloProvider } from '@apollo/react-hooks';
import NextApp from 'next/app';
import NProgress from 'next-nprogress/component';
import React from 'react';

import withApollo from '../utils/withApollo';
import NavContext from '../utils/NavContext';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import '../styles/style.scss';
import { MainLayout } from '../modules/shared/layouts';

interface State {
  openDropdownMenu: string;
}

class App extends NextApp<any, State> {
  state = {
    openDropdownMenu: '',
  };

  handleClick = (dropdownMenu: string) => {
    this.setState({ openDropdownMenu: dropdownMenu });
  };

  render() {
    const { Component, pageProps, router, apolloClient } = this.props;

    if (
      router.pathname.startsWith('/users/login') ||
      router.pathname.startsWith('/users/register') ||
      router.pathname.startsWith('/users/forgot-password') ||
      router.pathname.startsWith('/users/change-password')
    ) {
      return (
        <ApolloProvider client={apolloClient}>
          <NavContext.Provider
            value={{
              openDropdownMenu: this.state.openDropdownMenu,
              onClick: this.handleClick,
            }}
          >
            <NProgress color="#20a8d8" />
            <Component {...pageProps} />
          </NavContext.Provider>
        </ApolloProvider>
      );
    }

    return (
      <ApolloProvider client={apolloClient}>
        <NavContext.Provider
          value={{
            openDropdownMenu: this.state.openDropdownMenu,
            onClick: this.handleClick,
          }}
        >
          <NProgress color="#20a8d8" />
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </NavContext.Provider>
      </ApolloProvider>
    );
  }
}

export default withApollo(App);
