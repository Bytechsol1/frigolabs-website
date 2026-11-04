// Review-only configuration. Never add credentials or patient information here.
export const siteConfig = {
  loginUrl: process.env.NEXT_PUBLIC_LOGIN_URL || '/login',
  privacyUrl: process.env.NEXT_PUBLIC_PRIVACY_URL || '',
  termsUrl: process.env.NEXT_PUBLIC_TERMS_URL || '',
  submissionEnabled: false, // Enable only after an approved backend, validation and spam protection exist.
};
