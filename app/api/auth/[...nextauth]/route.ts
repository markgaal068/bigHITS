import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/src/lib/mongodb';
import User from '@/src/models/User';
import { compare } from 'bcrypt';

// Hardcoded admin user for development purposes
const ADMIN_EMAIL = 'admin@bighits.com';
const ADMIN_PASSWORD = 'admin123';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Check for hardcoded admin user for development
        if (credentials?.email === ADMIN_EMAIL && credentials?.password === ADMIN_PASSWORD) {
          return {
            id: 'admin-dev',
            name: 'Admin User',
            email: ADMIN_EMAIL,
            role: 'admin',
            image: null
          };
        }

        // If not using hardcoded credentials, proceed with database check
        await dbConnect();

        try {
          const user = await User.findOne({ email: credentials?.email });

          if (!user) {
            throw new Error('No user found with this email');
          }

          const isPasswordMatch = await compare(credentials?.password || '', user.password);

          if (!isPasswordMatch) {
            throw new Error('Incorrect password');
          }
          
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image
          };
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET || 'a-development-secret-for-bighits-app',
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
});

export { handler as GET, handler as POST }; 