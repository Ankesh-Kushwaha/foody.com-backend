declare namespace NodeJS {
  interface ProcessEnv {
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
    DATABASE_URL: string;
    Auth0_AUDIENCE: string;
    Auth0_issuerBaseURL: string;
    Auth0_tokenSigningAlg: string;
  }
}
