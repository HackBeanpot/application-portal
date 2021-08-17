import React, { ReactElement } from 'react';
import { useSessionOrRedirect } from '../hooks/useSessionOrRedirect';

const Home = (): ReactElement => {
  useSessionOrRedirect();
  return <div>Home Page</div>;
};

export default Home;
