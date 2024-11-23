
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { AUTHOR_BY_ID_GITHUB_QUERY } from "./sanity/lib/queries"
import { write } from "fs"
import { writeclient } from "./sanity/lib/WriteClient"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({user : {name,email,image}, account, profile : {id,login,bio}}) {
      const existingUser = await client.withConfig({useCdn : false}).fetch(AUTHOR_BY_ID_GITHUB_QUERY, {id})
      if (!existingUser) {
        await writeclient.create({
          _type: 'author',
          id,
          name,
          username: login,
          bio: bio || '',
          image,
          email,
        })
      }
      return true
    },
    async jwt ({token, account, profile}) {
      if (profile && account) {
        const user = await client.withConfig({useCdn : false}).fetch(AUTHOR_BY_ID_GITHUB_QUERY, {id: profile?.id})
        token.id = user?._id
      }
      return token
    },
    async session({session, token}) {
     Object.assign(session, {id : token.id})
      return session
    }
   
  },
})