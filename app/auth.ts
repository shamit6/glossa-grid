import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt-ts';
import { getUser } from 'app/db';
import { authConfig } from 'app/auth.config';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize({ email, password }: any) {
        let user = await getUser(email);
        if (user.length === 0) return null;
        let passwordsMatch = await compare(password, user[0].password!);
        if (passwordsMatch) return user[0] as any;
      },
    }),
  ],
  callbacks:{
     session:  async ({ session, token, user }) => {
      if (token) {
        if (session.user) {
          session.user.id = token.id as string
        }
      }
      return session
    },
    jwt: async ({ token, user, account, profile, isNewUser }) => {
      if (user) {
        token.id = user.id
      }

      return token
    },
  }
});
