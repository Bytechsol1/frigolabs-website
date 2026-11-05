// Public site configuration. Never add credentials or patient information here.
// Every value can be overridden with an environment variable (see .env.example).
export const siteConfig = {
  // On Vercel, fall back to the project's production domain (system env var, server-side only).
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL
    || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000'),
  loginUrl: process.env.NEXT_PUBLIC_LOGIN_URL || 'https://frigolabs.vercel.app/login',
  privacyUrl: process.env.NEXT_PUBLIC_PRIVACY_URL || '#',
  termsUrl: process.env.NEXT_PUBLIC_TERMS_URL || '#',
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true',
};
