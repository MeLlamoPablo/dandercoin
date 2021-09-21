import type { FC } from 'react';

import useConnect from './connect';
import Guest from './Guest';
import LoggedIn from './LoggedIn';
import { Container } from './styles';

const AccountView: FC = () => {
  const { account } = useConnect();

  return <Container>{account ? <LoggedIn /> : <Guest />}</Container>;
};

export default AccountView;
