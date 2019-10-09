import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

import { useMeQuery } from '../generated/graphql';

interface Props {
  title?: string;
}

const Container = styled('div')`
  background-color: #ecfcff;
`;

const Layout: React.FC<Props> = ({ children, title = '' }) => {
  const { loading, data } = useMeQuery();

  return (
    <Container>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>{' '}
          |{' '}
          <Link href="/hello">
            <a>Hello (Protected Page)</a>
          </Link>{' '}
          |{' '}
          <Link href="/user/register">
            <a>Register</a>
          </Link>{' '}
          |{' '}
          <Link href="/user/forgot-password">
            <a>Forgot Password</a>
          </Link>{' '}
          |{' '}
          <Link href="/user/login">
            <a>Login</a>
          </Link>{' '}
          {!loading && data && data.me && (
            <>
              |{' '}
              <Link href="/user/logout">
                <a>Logout</a>
              </Link>
            </>
          )}
        </nav>
      </header>
      {children}
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    </Container>
  );
};

export default Layout;
