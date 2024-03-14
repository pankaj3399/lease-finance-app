'use client';

import { useSession } from 'next-auth/react';

import { axios } from '@/lib/axios';

const useRefreshToken = () => {
  const { data: session, update } = useSession();

  const refreshToken = async () => {
    const res = await axios.post('/auth/refresh', {
      refreshToken: session?.user?.refreshToken,
    });

    if (session) {
      session.user.accessToken = res.data.accessToken;
      session.user.refreshToken = res.data.refreshToken;
      update({
        ...session,
        user: {
          ...session.user,
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        },
      });
    }
  };

  return refreshToken;
};

export default useRefreshToken;
