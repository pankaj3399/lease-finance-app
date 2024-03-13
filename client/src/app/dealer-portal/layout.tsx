import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const layout = (props: Props) => {
  const { children } = props;
  return <div>{children}</div>;
};

export default layout;
