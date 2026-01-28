import GithubProvider from 'next-auth/providers/github';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        token.login = profile.login;
        token.profileUrl = profile.html_url;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.login) session.user.login = token.login;
      if (token?.profileUrl) session.user.profileUrl = token.profileUrl;
      return session;
    },
  },
};
