import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

import { WithAuth } from '../../modules/shared';

interface Props {}

const Colors: NextPage<Props> = () => (
  <>
    <NextSeo title="Colors" />
    <div>Colors</div>
  </>
);

export default WithAuth(Colors);
