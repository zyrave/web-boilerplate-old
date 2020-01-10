import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

import withAuth from '../../utils/withAuth';

interface Props {}

const Themes: NextPage<Props> = () => (
  <>
    <NextSeo title="Themes" />
    <p>Themes</p>
  </>
);

export default withAuth(Themes);
