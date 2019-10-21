import React from 'react';
import { NextPage } from 'next';

import { Layout } from '../../components';

interface Props {}

const CheckEmail: NextPage<Props> = () => (
  <Layout title="Check Email">Please check you email to confirm your account</Layout>
);

export default CheckEmail;
