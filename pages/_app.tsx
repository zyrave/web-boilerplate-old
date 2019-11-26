import React from 'react';
import NextApp from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';

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
        <NavContext.Provider value={{ openDropdownMenu: this.state.openDropdownMenu, onClick: this.handleClick }}>
          <Component {...pageProps} />
        </NavContext.Provider>
      </ApolloProvider>
    );
  }
}

export default withApollo(App);
