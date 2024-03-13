'use client';

import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Provider = (props: Props) => {
  const { children } = props;
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;
