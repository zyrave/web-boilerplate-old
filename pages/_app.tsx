import React from 'react';
import NextApp from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import NProgress from 'next-nprogress/component';

import withApollo from '../lib/withApollo';
import NavContext from '../lib/NavContext';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import '../styles/style.scss';

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
    const { Component, pageProps, apolloClient } = this.props;

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
}

export default withApollo(App);
