import Universe from "@/providers/universe";
import NextAuth from "next-auth"
import "next-auth/jwt"

import Amazon from "@/providers/amazon"
import Deezer from "@/providers/deezer"
import Google from "next-auth/providers/google"
import Mixcloud from "@/providers/mixcloud"
import MusicBrainz from "@/providers/musicbrainz"
import Soundcloud from "@/providers/soundcloud"
import { createStorage } from "unstorage"
import memoryDriver from "unstorage/drivers/memory"
import vercelKVDriver from "unstorage/drivers/vercel-kv"
import { UnstorageAdapter } from "@auth/unstorage-adapter"
import type { NextAuthConfig } from "next-auth"
import type { NextRequest } from "next/server";

const storage = createStorage({
  driver: process.env.VERCEL
    ? vercelKVDriver({
        url: process.env.AUTH_KV_REST_API_URL,
        token: process.env.AUTH_KV_REST_API_TOKEN,
        env: false,
      })
    : memoryDriver(),
})

const config = (req: NextRequest | undefined)=> ({
  theme: { logo: "https://authjs.dev/img/logo-sm.png" },
  adapter: UnstorageAdapter(storage),
  providers: [
    Amazon({
      style: {
        brandColor: "#ff9900",
        logo: "https://raw.githubusercontent.com/emulienfou/next-auth/feat/amazon-provider/docs/public/img/providers/amazon.svg",
      }
    }),
    // Deezer,
    Google,
    // Mixcloud,
    MusicBrainz({
      style: {
        brandColor: "#eb743b",
        logo: "https://upload.wikimedia.org/wikipedia/commons/9/9e/MusicBrainz_Logo_%282016%29.svg",
      }
    }),
    Soundcloud(req, {}),
    Universe({
      style: {
        brandColor: "#3a66e5",
        logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Eo_circle_blue_letter-u.svg",
      }
    }),
  ],
  // basePath: "/auth",
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === "/middleware-example") return !!auth
      return true
    },
    jwt({ token, trigger, session, account }) {
      if (trigger === "update") token.name = session.user.name
      if (account?.provider === "keycloak") {
        return { ...token, accessToken: account.access_token }
      }
      return token
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken
      }
      return session
    },
  },
  experimental: {
    enableWebAuthn: true,
  },
  debug: true,
} satisfies NextAuthConfig)

export const { handlers, auth, signIn, signOut } = NextAuth((req) => config(req))

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}
