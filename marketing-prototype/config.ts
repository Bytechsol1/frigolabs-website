// Public site configuration. Never add credentials or patient information here.
// Every value can be overridden with an environment variable (see .env.example).
export const siteConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  clinicLoginUrl: process.env.NEXT_PUBLIC_CLINIC_LOGIN_URL || '/login?portal=clinic',
  patientLoginUrl: process.env.NEXT_PUBLIC_PATIENT_LOGIN_URL || '/login?portal=patient',
  privacyUrl: process.env.NEXT_PUBLIC_PRIVACY_URL || '#',
  termsUrl: process.env.NEXT_PUBLIC_TERMS_URL || '#',
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true',
};
