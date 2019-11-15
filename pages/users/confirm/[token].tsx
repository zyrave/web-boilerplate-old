import { useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';

import { useConfirmUserMutation } from '../../../generated/graphql';
import redirect from '../../../lib/redirect';

interface Props {
  token?: {};
}

const getInitialProps = async ({ query: { token } }: NextPageContext) => ({ token });

const Confirm: NextPage<Props> = ({ token }, ...ctx) => {
  const [confirmUser] = useConfirmUserMutation();

  useEffect(() => {
    const runEffect = async () => {
      try {
        const response = await confirmUser({
          variables: {
            token: token as string,
          },
        });

        if (response.data && response.data.confirmUser) {
          redirect(ctx, '/users/login');
        }
      } catch (err) {
        console.log(err);
        return;
      }
    };

    runEffect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Something went wrong!</div>;
};

Confirm.getInitialProps = getInitialProps;

export default Confirm;
