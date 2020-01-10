import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

import withAuth from '../../utils/withAuth';

interface Props {}

const Colors: NextPage<Props> = () => (
  <>
    <NextSeo title="Colors" />
    <div>Colors</div>
  </>
);

export default withAuth(Colors);
