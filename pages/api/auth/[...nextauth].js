import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

// import FacebookProvider from "next-auth/providers/facebook"
// import TwitterProvider from "next-auth/providers/twitter"
// import Auth0Provider from "next-auth/providers/auth0"
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"

import connectMongo from '@/db/mongo_conn'
import Users from '@/models/Schema'
import { compare } from 'bcryptjs'

export const authOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    /* EmailProvider({
         server: process.env.EMAIL_SERVER,
         from: process.env.EMAIL_FROM,
       }),
    // Temporarily removing the Apple provider from the demo site as the
    // callback URL for it needs updating due to Vercel changing domains

    Providers.Apple({
      clientId: process.env.APPLE_ID,
      clientSecret: {
        appleId: process.env.APPLE_ID,
        teamId: process.env.APPLE_TEAM_ID,
        privateKey: process.env.APPLE_PRIVATE_KEY,
        keyId: process.env.APPLE_KEY_ID,
      },
    }),
    */
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET,
    // }),
    // TwitterProvider({
    //   clientId: process.env.TWITTER_ID,
    //   clientSecret: process.env.TWITTER_SECRET,
    // }),
    // Auth0Provider({
    //   clientId: process.env.AUTH0_ID,
    //   clientSecret: process.env.AUTH0_SECRET,
    //   issuer: process.env.AUTH0_ISSUER,
    // }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials, req) { 
        connectMongo().catch(error => res.status(403).json({error: 'mongodb connect fail ' + error.message }))
        
        // check user existance
        const user = await Users.findOne({email: credentials.email})
        console.log('user', user)
        
        if(!user) {
          throw new Error('User does not exist')
        }
        
        // check password
        const checkPassword = await compare(credentials.password, user.password)
        if(!checkPassword || user.email !== credentials.email) {
          throw new Error('Username or Password does not match')
        }

        return {
            name: user.username,
            email: user.email,
            image: user.username === 'Calkwalk' ? '/assets/qxw.jpg' : '/assets/login.png'
        }
      },
    })
    
  ],
  theme: {
    colorScheme: "dark",
  },
  callbacks: {
    async jwt({ token }) {
      console.log('token',token)
      return token
    },
    // async session({ session, user, token }){
    //   console.log('session.callback', session)
    //   console.log('user.callback', user)
    //   console.log('token.callback', token)

    //   session.user.name="HAHa---"
    //   return session
    // },
  },
  secret: 'AJIobx6RLdL0aHHkiksWJCUqO3umKQtQ'
}

export default NextAuth(authOptions)
