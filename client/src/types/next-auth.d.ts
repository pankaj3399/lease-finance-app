import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken: string;
      refreshToken: string;
      user: {
        _id: string;
        username: string;
      };
    };
  }
}
