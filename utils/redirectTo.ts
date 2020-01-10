import Router from 'next/router';

const redirectTo = ({ res }: any, target: string) => {
  const isServer = !!res;

  if (isServer) {
    res.writeHead(302, { Location: target });
    res.end();
  } else {
    // browser
    Router.push(target);
  }
};

export default redirectTo;
