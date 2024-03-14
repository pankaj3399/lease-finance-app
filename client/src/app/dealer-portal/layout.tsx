'use client';

import { PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, MenuProps } from 'antd';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  const { children } = props;

  const router = useRouter();

  const { status, data } = useSession();

  const onMenuClickHandler: MenuProps['onClick'] = (e) => {
    if (e.key === 'signout') {
      signOut({ redirect: false, callbackUrl: '/login' });
    }
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const items: MenuProps['items'] = [
    {
      label: 'Signout',
      icon: <PoweroffOutlined />,
      key: 'signout',
    },
  ];

  return (
    <>
      <div className='top-header flex justify-end w-full bg-black h-10 px-4 fixed top-0 z-[1000]'>
        <Dropdown
          menu={{ items, onClick: onMenuClickHandler }}
          trigger={['click']}
        >
          <div className='flex items-center cursor-pointer'>
            <Avatar icon={<UserOutlined />} />
            <p className='text-white'>{data?.user?.user?.username}</p>
          </div>
        </Dropdown>
      </div>
      {children}
    </>
  );
};

export default Layout;
