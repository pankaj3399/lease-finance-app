import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { axios } from '@/lib/axios';

const { NEXTAUTH_SECRET } = process.env;

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'username',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          const res = await axios.post('/auth/login', {
            username: credentials?.username,
            password: credentials?.password,
          });

          return res.data;
        } catch (err: any) {
          throw new Error(err?.response?.data?.message ?? err?.message);
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, trigger, user, session }) {
      if (trigger === 'update') {
        return { ...token, ...session.user };
      }

      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  secret: NEXTAUTH_SECRET,
});
export { handler as GET, handler as POST };
