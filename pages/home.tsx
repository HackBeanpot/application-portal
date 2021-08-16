import React, { ReactElement } from 'react';
import { useSignIn } from '../hooks/useSignIn';

const Home = (): ReactElement => {
  useSignIn();
  return <div>Home Page</div>;
};

export default Home;
