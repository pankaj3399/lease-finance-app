'use client';

import { useSession } from 'next-auth/react';

import { axiosAuth } from '@/lib/axios';
import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';

const useAxiosAuth = () => {
  const { data: session } = useSession();
  const refreshToken = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${session?.user.accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosAuth.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevReq = error.config;

        if (error.response.status === 401 && !prevReq.sent) {
          prevReq.sent = true;

          await refreshToken();
          prevReq.headers.Authorization = `Bearer ${session?.user?.accessToken}`;

          return axiosAuth(prevReq);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
    };
  }, [session, refreshToken]);

  return axiosAuth;
};

export default useAxiosAuth;
