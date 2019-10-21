import React from 'react';
import { NextPage } from 'next';

import { Layout } from '../../components';

interface Props {}

const Colors: NextPage<Props> = () => (
  <Layout title="Colors">
    <div>Colors</div>
  </Layout>
);

export default Colors;
