import React, { FC } from 'react';
import Link from 'next/link';
import { withRouter, NextRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import { Breadcrumb as RbBreadcrumb, BreadcrumbItem } from 'react-bootstrap';
import classNames from 'classnames';

const getPaths = (pathname: string) => {
  const paths = ['/'];

  if (pathname === '/') return paths;

  pathname.split('/').reduce((prev: any, curr: any) => {
    const currPath = `${prev}/${curr}`;
    paths.push(currPath);
    return currPath;
  });

  return paths;
};

const BreadcrumbsItem: FC<{ path: string; routeName: string; pathName: string }> = ({ path, routeName, pathName }) =>
  pathName === path ? (
    <BreadcrumbItem active>{routeName}</BreadcrumbItem>
  ) : (
    <BreadcrumbItem active>
      <Link href={path || '/'}>
        <a>{routeName}</a>
      </Link>
    </BreadcrumbItem>
  );

const Breadcrumbs: FC<any> = (router, routes) => {
  const paths = getPaths(router.pathname);

  const items = paths.map((path: string, i: any) => {
    const index = routes.findIndex((r: any) => r.path === path);
    const routeName = routes[index].name;
    return <BreadcrumbsItem key={i} path={path} routeName={routeName} pathName={router.pathname} />;
  });

  return <RbBreadcrumb>{items}</RbBreadcrumb>;
};

interface Props {
  className?: string;
  appRoutes: any;

  router: NextRouter;
}

const Breadcrumb: FC<Props> = ({ className = '', appRoutes, router }) => {
  const classes = classNames(className);

  return <div className={classes}>{Breadcrumbs(router, appRoutes)}</div>;
};

export default withRouter<WithRouterProps & Props>(Breadcrumb);
