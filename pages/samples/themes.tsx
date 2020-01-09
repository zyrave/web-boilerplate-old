import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

import { WithAuth } from '../../modules/shared';

interface Props {}

const Themes: NextPage<Props> = () => (
  <>
    <NextSeo title="Themes" />
    <p>Themes</p>
  </>
);

export default WithAuth(Themes);
