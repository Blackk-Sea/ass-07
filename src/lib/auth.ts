import { betterAuth } from "better-auth";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || "bazar_dor_super_secret_key_2026_assignment_07_xyz987",
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Per assignment requirement: Don't implement email verification
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "demo_google_id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "demo_google_secret",
      enabled: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "demo_github_id",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "demo_github_secret",
      enabled: Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET),
    },
  },
});

export type Session = typeof auth.$Infer.Session;
