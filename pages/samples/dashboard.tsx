import React from 'react';
import { NextSeo } from 'next-seo';

import withAuth from '../../utils/withAuth';

const Dashboard = () => (
  <>
    <NextSeo title="Dashboard" />
    <div className="content-wrapper mt-5">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Dashboard</h1>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <p>...</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </>
);

export default withAuth(Dashboard);
