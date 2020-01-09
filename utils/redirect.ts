import Router from 'next/router';

export default (ctx: any, target: string) => {
  const { req, res } = ctx;
  const isServer = !!req;

  if (isServer) {
    res.writeHead(302, { Location: target });
    res.end();
  } else {
    // in the browser
    Router.push(target);
  }
};
